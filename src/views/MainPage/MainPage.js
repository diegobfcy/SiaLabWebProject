import React, { useState } from "react";
import "./MainPage.css";
import ClientesTable from "../../components/ClientesTable/ClientesTable";
import FacturasTable from "../../components/FacturasTable/FacturasTable";
import MetodosTable from "../../components/MetodosTable/MetodosTable";
import ProductosTable from "../../components/ProductosTable/ProductosTable";
import Bienvenido from "../../components/Bienvenido/Bienvenido";
import { FaUser } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MainPage = () => {
  const [selectedTable, setSelectedTable] = useState("bienvenido"); // Estado para controlar qué tabla mostrar
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del pop-up
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth(); // Obtener datos del usuario actual y función de logout

  const handleMenuClick = (tableName) => {
    setSelectedTable(tableName); // Actualiza el estado con el nombre de la tabla seleccionada
  };

  const togglePopup = () => {
    setShowPopup(!showPopup); // Alterna la visibilidad del pop-up
  };

  const handleLogoutOnClick = () => {
    navigate("/");
    logout(); // Cierra la sesión del usuario
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="logo-section">
          <span className="app-name">Factura</span>
          <button className="user-icon-button" onClick={togglePopup}>
            <FaUser />
          </button>
        </div>

        <nav className="main-menu">
          <button
            className="menu-button"
            onClick={() => handleMenuClick("clientes")}
          >
            Clientes
          </button>

          <button
            className="menu-button"
            onClick={() => handleMenuClick("facturas")}
          >
            Facturas
          </button>

          <button
            className="menu-button"
            onClick={() => handleMenuClick("metodos")}
          >
            Métodos
          </button>

          <button
            className="menu-button"
            onClick={() => handleMenuClick("productos")}
          >
            Productos
          </button>
        </nav>
      </header>

      <main className="content">
        {selectedTable === "clientes" && <ClientesTable />}
        {selectedTable === "facturas" && <FacturasTable />}
        {selectedTable === "metodos" && <MetodosTable />}
        {selectedTable === "productos" && <ProductosTable />}
        {selectedTable === "bienvenido" && <Bienvenido nombre={currentUser.nombre_usuario} />} {/* Ajusta esto según la estructura de tu usuario */}
      </main>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="popup-username">{currentUser.nombre_usuario}</span> {/* Ajusta esto según la estructura de tu usuario */}
            <button className="popup-logout-button" onClick={handleLogoutOnClick}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
