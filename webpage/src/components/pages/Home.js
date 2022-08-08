import React from "react";
import Servicios from "../images/servicios-inicio.webp";
import Noticias from "../images/noticias-inicio.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <main>
        <div className="container-fluid p-0">
          <div className="site-content">
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column">
                <h1 className="site-title">julbe'en consultores</h1>
                <p className="site-desc">
                  Inspiramos la evolución sostenible y sostenida de las
                  organizaciones.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-servicios">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <picture>
                  <img src={Servicios} alt="image1" width="490" />
                </picture>
              </div>
              <div className="col-md-6 text-center">
                <h1 className="heading-1">nuestros servicios</h1>
                <p className="paragraph-1">
                  Brindamos servicios de asesoría y acompañamiento que les
                  permita a nuestros clientes alcanzar la autogestión de sus
                  organizaciones, a través de siete líneas de servicios:
                  Responsabilidad Social Empresarial, Sostenibilidad, Gestión
                  Ambiental, Educación Ambiental, Desarrollo y Mejora de Modelos
                  de Negocios, Mercadotecnia y Cursos y/o Talleres.
                </p>
                <Link
                  to="/servicios"
                  className="btn btn-blue"
                  type="button"
                  style={{ textTransform: "uppercase" }}
                >
                  ver mas
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section-quienes-somos">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center">
                <h1 className="heading-1">¿quiénes somos?</h1>
                <p className="paragraph-1">
                  Somos una empresa de consultores con experiencia en distintos
                  sectores y áreas dedicados a generar valor sostenible en sus
                  clientes para que impacten positivamente sus entornos.
                </p>
                <Link
                  to="/sobre-nosotros"
                  className="btn btn-blue"
                  type="button"
                  style={{ textTransform: "uppercase" }}
                >
                  ver mas
                </Link>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>

        <div className="section-noticias">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={Noticias} alt="image1" width="490" />
              </div>
              <div className="col-md-6 text-center">
                <h1 className="heading-1">noticias</h1>
                <p className="paragraph-1">
                  A través de este espacio, compartimos conocimiento,
                  experiencias y/o información de gran valor para nuestros
                  clientes, con el fin de mantenerlos actualizados sobre las
                  novedades y tendencias que están inspirando la evolución de
                  las organizaciones en el mundo.
                </p>
                <Link
                  to="/noticias"
                  className="btn btn-blue"
                  type="button"
                  style={{ textTransform: "uppercase" }}
                >
                  ver mas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
