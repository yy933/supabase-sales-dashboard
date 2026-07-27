import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Dashboard from "./routes/Dashboard";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Header />
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
