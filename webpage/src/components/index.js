import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NotFound from "./utils/not_found/NotFound";

function index() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sobre-nosotros" component={AboutUs} />
      <Route exact path="/servicios" component={Services} />
      <Route exact path="/contacto" component={Contact} />
      <Route exact path="/noticias" component={News} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
}

export default index;
