import React from "react";
import { Link, useLocation } from "react-router-dom";
//import Logo from "../images/logo.png";
import Logo from "../images/logo.webp";

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
              <Link
                className="nav-link"
                to="/"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Inicio
              </Link>
            </li>
            <li className={"nav-item" + isActive("/sobre-nosotros")}>
              <Link
                className="nav-link"
                to="/sobre-nosotros"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Sobre Nosotros
              </Link>
            </li>
            <li className={"nav-item" + isActive("/servicios")}>
              <Link
                className="nav-link"
                to="/servicios"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Servicios
              </Link>
            </li>
            <li className={"nav-item" + isActive("/noticias")}>
              <Link
                className="nav-link"
                to="/noticias"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Noticias
              </Link>
            </li>
          </ul>
          <ul className="navbar-button">
            <Link
              to="/contacto"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <button className=" btn-blue" type="button">
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
