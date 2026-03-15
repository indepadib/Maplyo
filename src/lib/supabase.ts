
import { createBrowserClient } from "@supabase/ssr";

// Keys provided by user. 
// In production, these should be in .env.local, but due to file permissions in this environment,
// we are initializing them directly here for the demo.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'maplyo-auth-token',
    }
});
