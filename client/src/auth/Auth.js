import { useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Auth({ onUserChange }) {
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, 
      },
    });
    if (error) console.error("Sign-in error:", error.message);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign-out error:", error.message);
    onUserChange(null); // force UI reset
  };

  useEffect(() => {
    // Load existing session if exists
    supabase.auth.getSession().then(({ data }) => {
      onUserChange(data.session?.user || null);
    });

    // Subscribe to login/logout/update events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        onUserChange(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return {
    signIn,
    signOut,
  };
}
