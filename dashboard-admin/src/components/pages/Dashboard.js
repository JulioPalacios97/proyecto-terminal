import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
//import moment from "moment";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const state = useContext(GlobalState);
  const [quote] = state.quotesAPI.quotes;
  const [date, setDate] = useState([]);
  const [total, setTotal] = useState([]);

  const data = {
    labels: date,
    datasets: [
      {
        label: "servicio",
        data: total,
        backgroundColor: "#29CCFF",
        borderColor: "#004154",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    const datosGraficar = () => {
      const res = quote;
      const labels = [];

      const data = [];
      res.forEach(
        (element) => {
          labels.push(
            /*moment(element.createdAt).format("L")*/ element.service
          );
          data.push(element.total);
        },
        setDate(labels),
        setTotal(data)
      );
    };

    datosGraficar();
  }, [quote]);

  /*const data = {
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
  };*/

  return (
    <>
      <div className="details">
        <div
          className="table-services"
          style={{ width: "100%", height: "400px" }}
        >
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
