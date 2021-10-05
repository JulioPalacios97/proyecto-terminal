import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";

const Header = () => {
  const router = useLocation();
  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand ml-3" to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>

          {/*<i className="fas fa-stream" style={{ color: "white" }}></i>*/}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className={"nav-item" + isActive("/")}>
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className={"nav-item" + isActive("/sobre-nosotros")}>
              <Link className="nav-link" to="/sobre-nosotros">
                Sobre Nosotros
              </Link>
            </li>
            <li className={"nav-item" + isActive("/servicios")}>
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>
            <li className={"nav-item" + isActive("/noticias")}>
              <Link className="nav-link" to="/noticias">
                Noticias
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <Link to="/contacto">
              <button className="btn btn-blue" type="button">
                Contacto
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
