import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Secciones from "./Sections";
import Servicios from "./Servicios";
import CrearServicios from "./createService/CreateService";
import Clientes from "./Clientes";
import Cotizaciones from "./Cotizaciones";
import CrearCotizaciones from "./createQuote/CreateQuote";
import Consultores from "./Consultores";
import CrearConsultores from "./createConsultant/CreateConsultant";
import Registro from "./Registro";
import Notfound from "./Notfound";

function Pages() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/secciones" exact component={Secciones} />
        <Route path="/servicios" exact component={Servicios} />
        <Route path="/editar_servicio/:id" exact component={CrearServicios} />
        <Route path="/crear_servicio" exact component={CrearServicios} />
        <Route path="/cotizaciones" exact component={Cotizaciones} />
        <Route path="/crear_cotizacion" exact component={CrearCotizaciones} />
        <Route path="/clientes" exact component={Clientes} />
        <Route path="/consultores" exact component={Consultores} />
        <Route
          path="/editar_consultor/:id"
          exact
          component={CrearConsultores}
        />
        <Route path="/crear_consultor" exact component={CrearConsultores} />
        <Route path="/registro" exact component={Registro} />
        <Route path="*" exact component={Notfound} />
      </Switch>
    </div>
  );
}

export default Pages;
