import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import ConsultantItem from "./utils/ConsultantItem";

const Administradores = () => {
  const state = useContext(GlobalState);
  const [consultants] = state.consultantsAPI.consultants;
  const [callback, setCallback] = state.consultantsAPI.callback;
  const [token, setToken] = useState("");
  const [search, setSearch] = state.consultantsAPI.search;

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);
  return (
    <div>
      <div className="details">
        <div className="table">
          <div className="cardHeader">
            <h2>Consultores Actuales</h2>
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
            <Link to="/crear_consultor" className="btn">
              crear
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>imagen</td>
                <td>nombre</td>
                <td>opciones</td>
              </tr>
            </thead>
            {consultants.map((consultant) => {
              return (
                <ConsultantItem
                  key={consultant._id}
                  consultant={consultant}
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

export default Administradores;
