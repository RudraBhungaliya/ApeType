import React, { useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Auth({ onUserChange }) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      onUserChange(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        onUserChange(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return null; // Auth should NOT render anything
}
