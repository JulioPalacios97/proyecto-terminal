import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import ServiceItem from "./utils/ServiceItem";

const Servicios = () => {
  const state = useContext(GlobalState);
  const [services] = state.servicesAPI.services;
  const [callback, setCallback] = state.servicesAPI.callback;
  const [token, setToken] = useState("");
  const [search, setSearch] = state.servicesAPI.search;

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);

  return (
    <div>
      <div className="details">
        <div className="table">
          <div className="cardHeader">
            <h2>Servicios Actuales</h2>
            <div className="search">
              <label>
                <input
                  type="text"
                  value={search}
                  placeholder="buscar"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <i className="fas fa-search"></i>
              </label>
            </div>
            <Link to="/crear_servicio" className="btn">
              crear
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>imagen</td>
                <td>servicio</td>
                <td>opciones</td>
              </tr>
            </thead>
            {services.map((service) => {
              return (
                <ServiceItem
                  key={service._id}
                  service={service}
                  callback={callback}
                  setCallback={setCallback}
                  token={token}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
