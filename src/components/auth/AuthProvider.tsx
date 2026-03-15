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

    // 3. Handle protected route redirection
    // Removed the aggressive 3s timer. Relying on middleware for redirection.
    // This prevents client-side loops during slow hydration.

    const signOut = async () => {
        // Redirect to our new server-side signout route
        window.location.href = "/api/auth/signout";
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {!loading ? children : (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-zinc-500 text-sm animate-pulse">Synchronisation Maplyo...</p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
