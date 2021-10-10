import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import QuoteItem from "./utils/QuoteItem";

function Cotizaciones() {
  const state = useContext(GlobalState);
  const [quotes] = state.quotesAPI.quotes;
  const [callback, setCallback] = state.quotesAPI.callback;
  const [token, setToken] = useState("");
  const [search, setSearch] = state.quotesAPI.search;

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);

  return (
    <div>
      <div className="details">
        <div className="table">
          <div className="cardHeader">
            <h2>Cotizaciones Actuales</h2>
            <div className="search">
              <label>
                <input
                  type="text"
                  value={search}
                  placeholder="buscar..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <i className="fas fa-search"></i>
              </label>
            </div>
            <Link to="/crear_cotizacion" className="btn">
              crear
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>cliente</td>
                <td>administrador</td>
                <td>servicio</td>
                <td>total</td>
                <td>opciones</td>
              </tr>
            </thead>
            {quotes.map((quote) => {
              return (
                <QuoteItem
                  key={quote._id}
                  quote={quote}
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
}

export default Cotizaciones;
