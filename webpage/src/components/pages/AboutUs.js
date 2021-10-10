import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ConsultantItem from "../utils/consultant_item/ConsultantItem";
import Mision from "../images/julbeen-mision.png";
import Vision from "../images/julbeen-vision.png";
import Valores from "../images/julbeen-valores.png";
import { Helmet } from "react-helmet";

function AboutUs() {
  const state = useContext(GlobalState);
  const [consultants] = state.consultantsAPI.consultants;
  return (
    <div>
      <Helmet>
        <title>Sobre Nosotros | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <section className="section_banner">
        <div>
          <div className="section_titulo">
            <h1 className="text-white text-uppercase">¿Quiénes Somos?</h1>
          </div>
        </div>
      </section>

      <div className="section-quienes-somos">
        <div className="container text-center">
          <p className="paragraph1">
            Julbe´en Consultores está formado por un grupo de profesionales, que
            buscan impactar a las personas y comunidades generando valor a
            través de la sostenibilidad a largo plazo, aprovechando el poder del
            cambio y la mejora continua.
          </p>
        </div>
      </div>

      <div className="section-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img src={Mision} alt="mision" width="115" />
              <h2 className="heading1">misión</h2>
              <p className="paragraph1">
                Ser una empresa integral de consultoría con resultados positivos
                en sus clientes, transformando el mundo de los negocios.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={Vision} alt="mision" width="100" />
              <h2 className="heading1">visión</h2>
              <p className="paragraph1">
                Ser una consultoría líder en México que contribuya en el
                desarrollo de las organizaciones a ser su mejor versión,
                inspirándose para la autogestión y contribuyendo al bien común.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-3">
        <div className="container text-center">
          <img src={Valores} alt="mision" width="115" />
          <h2 className="heading1">valores</h2>
          <div className="row">
            <div className="col-md-6">
              <p className="paragraph1">
                <b>Sinergía empática:</b> Valoramos las diferencias bajo un
                marco de inclusión y respeto.
                <br />
                <b>Fiabilidad de desempeño:</b> Aceptamos los retos, somos un
                equipo multidisciplinario que cumplimos nuestros compromisos en
                tiempo y forma.
                <br />
                <b>Integridad inquebrantable:</b> Siempre tenemos el valor de
                hacer lo correcto.
              </p>
            </div>
            <div className="col-md-6">
              <p className="paragraph1">
                <b>Congruencia sostenible:</b> Creemos en la construcción de
                negocios responsables y actuamos en concordancia para la
                concepción de realidades diferentes en lo económico, social y
                ambiental.
                <br />
                <b>Innovación creativa:</b> Creamos soluciones de valor para
                transformar procesos e ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-4">
        <div className="spacer__m">
          <section id="directorio" className="bg-aqua-deg">
            <div className="spacer__m"></div>
            <h1
              className="text-center text-white"
              style={{ textTransform: "uppercase" }}
            >
              nuestros consultores
            </h1>
            <div className="spacer__sm"></div>
          </section>
        </div>

        <div className="container">
          <div className="consultores">
            {consultants.map((consultant) => {
              return (
                <ConsultantItem key={consultant._id} consultant={consultant} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
