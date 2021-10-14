import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pages from "../pages/Pages";
import Logo from "../img/logo-dashboard.png";

const Sidebar = ({ sidebarOpen, buttonSidebar, setLogin, isLogin }) => {
  const [token, setToken] = useState("");
  const router = useLocation();

  const logoutAdmin = async () => {
    localStorage.clear();
    setLogin(false);
  };

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active_text";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstlogin");
    setToken(firstLogin);
  }, []);
  return (
    <div className="container">
      <div className={sidebarOpen ? "navigation active" : "navigation"}>
        <ul>
          <li>
            <Link to="/" className="a">
              <span className="icon">
                <img src={Logo} alt="logo" />
              </span>
              <span className="title">
                <h2>Julbe'en</h2>
              </span>
            </Link>
          </li>
          <li className={isActive("/")}>
            <Link to="/">
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li className={isActive("/secciones")}>
            <Link to="/secciones">
              <span className="icon">
                <i className="fas fa-file"></i>
              </span>
              <span className="title">Secciones</span>
            </Link>
          </li>
          <li className={isActive("/servicios")}>
            <Link to="/servicios">
              <span className="icon">
                <i className="fab fa-servicestack"></i>
              </span>
              <span className="title">Servicios</span>
            </Link>
          </li>
          <li className={isActive("/cotizaciones")}>
            <Link to="/cotizaciones">
              <span className="icon">
                <i className="fas fa-file-alt"></i>
              </span>
              <span className="title">Cotizaciones</span>
            </Link>
          </li>
          <li className={isActive("/clientes")}>
            <Link to="/clientes">
              <span className="icon">
                <i className="fas fa-users"></i>
              </span>
              <span className="title">Clientes</span>
            </Link>
          </li>
          <li className={isActive("/consultores")}>
            <Link to="/consultores">
              <span className="icon">
                <i className="fas fa-user"></i>
              </span>
              <span className="title">Consultores</span>
            </Link>
          </li>
          <li className={isActive("/registro")}>
            <Link to="/registro">
              <span className="icon">
                <i className="fas fa-file-signature"></i>
              </span>
              <span className="title">Registrar</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="a" onClick={logoutAdmin}>
              <span className="icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className="title">Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={sidebarOpen ? "main active" : "main"}>
        <div className="topbar">
          <div
            className={sidebarOpen ? "toggle active" : "toggle"}
            onClick={() => buttonSidebar()}
          >
            <i className="fas">&#xf0c9;</i>
          </div>

          <div className="user">{token ? `${isLogin.name}` : ""}</div>
        </div>
        <Pages />
      </div>
    </div>
  );
};

export default Sidebar;
