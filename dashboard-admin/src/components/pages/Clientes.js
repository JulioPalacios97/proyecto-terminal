import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import ClientItem from "./utils/ClientItem";

const Clientes = () => {
  const state = useContext(GlobalState);
  const [clients] = state.clientsAPI.clients;
  const [callback, setCallback] = state.clientsAPI.callback;
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);
  return (
    <div>
      <div className="details">
        <div className="table-services">
          <div className="cardHeader">
            <h2>Clientes Actuales</h2>
          </div>
          <table>
            <thead>
              <tr>
                <td>cliente</td>
                <td>apellido</td>
                <td>servicio</td>
                <td>correo</td>
                <td>telefono</td>
                <td>opciones</td>
              </tr>
            </thead>
            {clients.map((client) => {
              return (
                <ClientItem
                  key={client._id}
                  client={client}
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

export default Clientes;
