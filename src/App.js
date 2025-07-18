import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import AccessControl from "./pages/AccessControl";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Configuration from "./pages/Configuration";
import AdminProfile from "./pages/AdminProfile";
import ForgotPassword from "./pages/ForgotPassword"; // Importar el componente ForgotPassword
import "./App.css";

function App() {
  // Inicializar el estado de autenticación basado en localStorage
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("auth") === "yes"
  );

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    localStorage.setItem("auth", "yes");
    setAuthenticated(true);
  };

  // Componente de ruta protegida
  const ProtectedRoute = ({ children }) => {
    if (!authenticated) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">
          {children}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Ruta para ForgotPassword */}

        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/monitoring" element={<ProtectedRoute><Monitoring /></ProtectedRoute>} />
        <Route path="/access-control" element={<ProtectedRoute><AccessControl /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/configuration" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

        {/* Redirigir cualquier otra ruta a login si no está autenticado */}
        <Route path="*" element={authenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

