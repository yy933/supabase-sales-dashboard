import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);
