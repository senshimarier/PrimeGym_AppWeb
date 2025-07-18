import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaBoxes, FaUserCircle } from "react-icons/fa";
import { IoMdFingerPrint } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { GiChart } from "react-icons/gi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const menu = [
    { to: "/dashboard", icon: <MdDashboard size={22} />, label: "Dashboard" },
    { to: "/monitoring", icon: <GiChart size={22} />, label: "Monitoreo Ambiental" },
    { to: "/access-control", icon: <IoMdFingerPrint size={22} />, label: "Control de Acceso" },
    { to: "/inventory", icon: <FaBoxes size={22} />, label: "Inventario" },
    { to: "/reports", icon: <FiFileText size={22} />, label: "Reportes" },
    { to: "/configuration", icon: <MdSettings size={22} />, label: "Configuración" },
    { to: "/profile", icon: <FaUserCircle size={22} />, label: "Perfil Admin" }
  ];

  return (
    <aside className="sidebar">
      {/* Logo y título */}
      <div className="sidebar-logo">
        <img
          src={process.env.PUBLIC_URL + "/assets/Prime_Gym.jpg"}
          alt="Prime Gym"
          className="sidebar-logo-img"
        />
        <span className="sidebar-logo-text">Prime Gym</span>
      </div>

      {/* Menú de navegación */}
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Botón de logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;