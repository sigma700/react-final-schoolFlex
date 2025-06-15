// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
