import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ServiceItem from "../utils/service_item/ServiceItem";
import { Helmet } from "react-helmet";

function Services() {
  const state = useContext(GlobalState);
  const [services] = state.servicesAPI.services;

  return (
    <div>
      <Helmet>
        <title>Servicios | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <section className="section_banner">
        <div>
          <div className="section_titulo">
            <h1 className="text-white text-uppercase">Servicios</h1>
          </div>
        </div>
      </section>

      <div className="section-1">
        <div className="container">
          <div className="services">
            {services.map((service) => {
              return <ServiceItem key={service._id} service={service} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
