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

  const signInUser = async (email, password) => {
    try {
      //supabase method
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      //handle supabase error explicitly
      if (error) {
        return { success: false, error: error.message };
      }
      //success
      console.log("supabase sign in success: ", data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      //Unexpected error
      console.error("unexpected error occured during sign in: ", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  //Sign out
  /**
  Challenge:
  * 1) Using the 'signInUser' function as a template, write a 'signOut' 
      function calling the 'auth.signOut()' method
  * 2) Only destructure 'error' and handle both Supabase and unexpected errors
      in a similar way to in the 'signInUser' function
  * 3) Add this function to the AuthContext's value prop
      Note: There is no need to pass the Supabase '.signOut()' method any 
      parameters.
  */

  const signOut = async () => {
    try {
      //supabase method
      const { error } = await supabase.auth.signOut();
      // handle supabase error explicitly
      if (error) {
        return { success: false, error: error.message };
      }
      // success
      console.log("supabase sign out success");
      return { success: true };
    } catch (error) {
      console.error(
        "unexpected error occured during sign out: ",
        error.message,
      );
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };
  return (
    <AuthContext.Provider value={{ session, loading, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
