"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log("AuthProvider: Initializing...");
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("AuthProvider: Initial session check", session ? "Session found" : "No session");
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // 2. Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`AuthProvider: Auth Event [${event}]`, session ? "Session present" : "No session");
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    // 3. Handle protected route redirection in a separate effect with a longer delay
    // This acts only as a backup to the server-side middleware redirects
    useEffect(() => {
        if (loading) return;

        const isProtectedRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/app/guides");
        
        if (!session && isProtectedRoute) {
            console.warn("AuthProvider: No session on protected route. Waiting 3s for stabilization...");
            const timer = setTimeout(() => {
                supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
                    if (!currentSession) {
                        console.error("AuthProvider: Final session check failed. Redirecting to /login.");
                        // If we are stuck in a weird state where session is missing but we're on a protected route,
                        // sometimes clearing the local storage and forcing a fresh login is the only way out.
                        if (error) {
                            console.error("Auth session error, clearing local state:", error);
                            supabase.auth.signOut();
                        }
                        router.push("/login");
                    } else {
                        console.log("AuthProvider: Session recovered after delay.");
                    }
                });
            }, 3000); // 3s delay - conservative to avoid flickers
            return () => clearTimeout(timer);
        }
    }, [session, loading, pathname, router, supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
