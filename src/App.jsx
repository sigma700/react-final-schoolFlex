import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import components
import Home from "./pages/Home";
import Finding from "./pages/Finding";
import School from "./pages/School";
import Listing from "./pages/Listing";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/components/Layout";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/finding", element: <Finding /> },
  { path: "/listing", element: <Listing /> },
  { path: "/finding/:id", element: <School /> },
  { path: "/collection", element: <Collection /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/signup", element: <Signup /> },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
