
import { createBrowserClient } from "@supabase/ssr";

// Keys provided by user. 
// In production, these should be in .env.local, but due to file permissions in this environment,
// we are initializing them directly here for the demo.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://leiaiothqandpyebrauv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaWFpb3RocWFuZHB5ZWJyYXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTM2NjEsImV4cCI6MjA4MjA4OTY2MX0.IuJ2uwwl6-ZvgnPy41rJfgY_YHbvUW7fmpzR7Sz7yKU";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
