import React from "react";
import Consultores from "../images/card-consultores.png";
import { Helmet } from "react-helmet";

function News() {
  return (
    <div>
      <Helmet>
        <title>Noticias | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <section className="section_banner">
        <div>
          <div className="section_titulo">
            <h1 className="text-white">Noticias</h1>
          </div>
        </div>
      </section>
      <div className="section-4">
        <div className="container">
          <div className="consultores">
            <div className="card rounded shadow" style={{ width: "18rem" }}>
              <img src={Consultores} className="card-img-top" alt="consultor" />
              <div className="card-body">
                <h5 className="card-title text-center">noticia 1</h5>
              </div>
            </div>
            <div className="card rounded shadow" style={{ width: "18rem" }}>
              <img src={Consultores} className="card-img-top" alt="consultor" />
              <div className="card-body">
                <h5 className="card-title text-center">noticia 2</h5>
              </div>
            </div>
            <div className="card rounded shadow" style={{ width: "18rem" }}>
              <img src={Consultores} className="card-img-top" alt="consultor" />
              <div className="card-body">
                <h5 className="card-title text-center">noticia 3</h5>
              </div>
            </div>
            <div className="card rounded shadow" style={{ width: "18rem" }}>
              <img src={Consultores} className="card-img-top" alt="consultor" />
              <div className="card-body">
                <h5 className="card-title text-center">noticia 4</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
