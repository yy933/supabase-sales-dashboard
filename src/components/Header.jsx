import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
function Header() {
  const { signOut } = useAuth();
  const [error, setError] = useState(null);
  const handleSignOut = async (e) => {
    e.preventDefault();
    const { success, error } = await signOut();
    if (success) {
      return <Navigate to="/" />;
    } else {
      setError(error.message);
    }
  };
  return (
    <>
      <header>
        <div
          className="header-email"
          role="navigation"
          aria-label="User account navigation"
        >
          <button onClick={handleSignOut} aria-label="Sign out of your account">
            Sign out
          </button>
          {error && (
            <div role="role" className="error-message" id="signout-error">
              {error}
            </div>
          )}
        </div>
        <h1>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px" }}
          >
            <path
              d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66"
              stroke="#29d952"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Sales Team Dashboard
        </h1>
      </header>
    </>
  );
}

export default Header;
