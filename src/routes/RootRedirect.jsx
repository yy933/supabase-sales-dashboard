import { useAuth } from "../Hooks/useAuth";
import { Navigate } from "react-router-dom"; // declarative navigation
//useNavigate: imperative navigation
const RootRedirect = () => {
  const { session } = useAuth();
  if (session === undefined) {
    return <h1>Loading...</h1>;
  }
  // /null = signin, data = /dashboard
  return session ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
};

export default RootRedirect;
