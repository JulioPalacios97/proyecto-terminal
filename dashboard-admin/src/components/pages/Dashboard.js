import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
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
          labels.push(element.service);
          data.push(element.total);
        },
        setDate(labels),
        setTotal(data)
      );
    };

    datosGraficar();
  }, [quote]);

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
