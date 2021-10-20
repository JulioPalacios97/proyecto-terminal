import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
//import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const state = useContext(GlobalState);
  //console.log(state.quotesAPI.quotes);
  const [service] = state.quotesAPI.quotes;
  const [clientes, setClientes] = useState([]);
  const [services, setServices] = useState([]);

  const data = {
    labels: services,
    datasets: [
      {
        label: "Servicios",
        backgroundColor: "rgba(0,255,0,1)",
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,255,0,0.2)",
        hoverBorderColor: "#FFF000",
        data: clientes,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    const datosGraficar = () => {
      const res = service;
      const auxClientes = [],
        auxServices = [];
      res.forEach(
        (element) => {
          auxClientes.push(element.total);
          auxServices.push(element.service);
        },
        setClientes(auxClientes),
        setServices(auxServices)
      );
    };
    datosGraficar();
  }, [service]);
  return (
    <>
      {/*<div className="cardBox">
        <div className="card">
          <div>
            <div className="numbers">1,04</div>
            <div className="cardName">Daily viewa</div>
          </div>
          <div className="iconBox">
            <i className="fa fa-eye"></i>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">1,04</div>
            <div className="cardName">Daily viewa</div>
          </div>
          <div className="iconBox">
            <i className="fa fa-eye"></i>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">1,04</div>
            <div className="cardName">Daily viewa</div>
          </div>
          <div className="iconBox">
            <i className="fa fa-eye"></i>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">1,04</div>
            <div className="cardName">Daily viewa</div>
          </div>
          <div className="iconBox">
            <i className="fa fa-eye"></i>
          </div>
        </div>
      </div>*/}
      <div className="details">
        <div
          className="table-services"
          style={{ width: "100%", height: "400px" }}
        >
          <Bar data={data} options={options} />
          {/*<div className="cardHeader">
            <h2>Servicios Actuales</h2>
            <Link to="#" className="btn">
              crear
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>folio</td>
                <td>servicio</td>
                <td>categoria</td>
                <td>precio</td>
                <td>opciones</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>Factura</td>
                <td>cotisaciones</td>
                <td>$1200</td>
                <td>
                  <button className="edit">editar</button>{" "}
                  <button className="delete">eliminar</button>{" "}
                  <button className="print">imprimir</button>
                </td>
              </tr>
              <tr>
                <td>0</td>
                <td>Factura</td>
                <td>cotisaciones</td>
                <td>$1200</td>
                <td>
                  <button className="edit">editar</button>{" "}
                  <button className="delete">eliminar</button>{" "}
                  <button className="print">imprimir</button>
                </td>
              </tr>
              <tr>
                <td>0</td>
                <td>Factura</td>
                <td>cotisaciones</td>
                <td>$1200</td>
                <td>
                  <button className="edit">editar</button>{" "}
                  <button className="delete">eliminar</button>{" "}
                  <button className="print">imprimir</button>
                </td>
              </tr>
              <tr>
                <td>0</td>
                <td>Factura</td>
                <td>cotisaciones</td>
                <td>$1200</td>
                <td>
                  <button className="edit">editar</button>{" "}
                  <button className="delete">eliminar</button>{" "}
                  <button className="print">imprimir</button>
                </td>
              </tr>
              <tr>
                <td>0</td>
                <td>Factura</td>
                <td>cotisaciones</td>
                <td>$1200</td>
                <td>
                  <button className="edit">editar</button>{" "}
                  <button className="delete">eliminar</button>{" "}
                  <button className="print">imprimir</button>
                </td>
              </tr>
            </tbody>
          </table>*/}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
