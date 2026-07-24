import { useState } from "react";
import { AuthContext } from "../Hooks/useAuth";

export default function AuthContextProvider({ children }) {
  //Auth functions (signin, signup, logout)

  //Session state (user info, sign-in status)
  const [session, setSession] = useState(null);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}
