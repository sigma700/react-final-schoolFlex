import { useState } from "react";
import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  const sideBarData = [
    {
      title: "Home",
      path: "/",
      icon: "house.svg",
    },
    {
      title: "Change Role",
      path: "",
      icon: "arrow-down-up.svg",
    },
    {
      title: "Contacts",
      path: "/contact",
      icon: "smartphone.svg",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "layout-dashboard.svg",
    },
    {
      title: "Collections",
      path: "/collections",
      icon: "archive.svg",
    },
  ];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <main className="lg:hidden text-white h-full">
      <div className="nav-bar float-right">
        <Link to="#" className="menu-bars" onClick={toggleSidebar}>
          <img className="w-[30px]" src="/menu.svg" alt="Menu" />
        </Link>
      </div>
      <nav className={`nav-menu ${isSidebarVisible ? "active" : "inactive"}`}>
        {isSidebarVisible && (
          <ul className="bg-black p-[20px] rounded-[10px] absolute flex flex-col gap-[30px] right-0 top-0 h-full transform ease-in-out transition-all duration-[0.3s]">
            <li className="nav-bar-toggle">
              <Link
                onClick={toggleSidebar}
                to="#"
                className="menu-bars text-center"
              >
                <img src="/x.svg" alt="Close" />
              </Link>
            </li>
            {sideBarData.map((item, index) => (
              <li className="flex gap-[30px] items-center" key={index}>
                <img className="w-[20px]" src={item.icon} alt="" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </main>
  );
}
