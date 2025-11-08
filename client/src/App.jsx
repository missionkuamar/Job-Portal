import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Jobs } from "./components/Jobs";
import { Browse } from "./components/Browse";
import { Profile } from "./components/Profile";
import { JobDescription } from "./components/JobDescription";
import { ProtectedRoute } from "./components/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/job",
    element: <Jobs />,
  },

  {
        path: "/browse",
        element: <Browse />,
      },
  // ✅ Protected Routes
  {
    element: <ProtectedRoute />, // wrapper for all protected routes
    children: [
      {
    path: "/description/:id",
    element: <JobDescription />,
  },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
