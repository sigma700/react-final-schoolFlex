// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* Add common UI here (header, nav, etc) */}
      <header>My App Header</header>

      {/* This renders child routes */}
      <Outlet />

      <footer>My App Footer</footer>
    </div>
  );
}
