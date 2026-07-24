import { useState, useEffect } from "react";
import { AuthContext } from "../Hooks/useAuth";
import supabase from "../supabase-client";

export default function AuthContextProvider({ children }) {
  //Auth functions (signin, signup, logout)

  //Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //1) Check on 1st render for a session (getSession())
    let isMounted = true;
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (isMounted) {
          setSession(data.session);
          console.log("Session: ", data.session);
        }
      } catch (error) {
        console.error("Error getting initial session:", error.message || error);
        if (isMounted) setSession(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getInitialSession();

    //2) Listen for changes in auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
