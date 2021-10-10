import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CreateQuote() {
  const state = useContext(GlobalState);
  const [clients] = state.clientsAPI.clients;
  const [services] = state.servicesAPI.services;
  const [data, setData] = useState({
    place_date: "",
    client_name: "",
    quote_number: "",
    service: "",
    start_date: "",
    end_date: "",
    quote_admin: "",
    days: "",
    hours: "",
    concept: "",
    price: "",
    organization_size: "",
    level_difficulty: "",
  });
  const [token, setToken] = useState("");
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [detailConcept, setDetailConcept] = useState([]);
  const [callback, setCallback] = state.quotesAPI.callback;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onClickConcept = (e) => {
    e.preventDefault();

    const addData = {
      concepts: data.concept,
      prices: data.price,
    };

    const num = total + parseInt(addData.prices);

    const newAddData = [...detailConcept, addData];

    setDetailConcept(newAddData);
    setTotal(num);
  };

  const deletConcept = (index) => {
    const price = data.price;

    const num = total - parseInt(price);

    const concept = [...detailConcept];
    concept.splice(index, 1);

    setDetailConcept(concept);
    setTotal(num);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      const dataSave = {
        detailConcept: detailConcept,
        total: total,
        place_date: data.place_date,
        client_name: data.client_name,
        quote_number: data.quote_number,
        service: data.service,
        start_date: data.start_date,
        end_date: data.end_date,
        quote_admin: data.quote_admin,
        days: data.days,
        hours: data.hours,
        organization_size: data.organization_size,
        level_difficulty: data.level_difficulty,
      };

      await axios.post("/api/quote", dataSave, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      history.push("/cotizaciones");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);

  return (
    <div className="create_quote">
      <form onSubmit={guardarDatos}>
        <div className="quote_data">
          <div className="col-6">
            <label htmlFor="place_date">Lugar y Fecha</label>
            <input
              type="text"
              name="place_date"
              value={data.place_date}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="client_name">Nombre del Cliente</label>
            <select
              name="client_name"
              value={data.client_name}
              onChange={onChangeInput}
            >
              <option value="">Selecciona el nombre del cliente</option>
              {clients.map((client) => (
                <option value={client.username} key={client._id}>
                  {client.username}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="quote_number">Numero de cotización</label>
            <input
              type="text"
              name="quote_number"
              value={data.quote_number}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="quote_admin">Administrador</label>
            <input
              type="text"
              name="quote_admin"
              id="quote_admin"
              value={data.quote_admin}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="service">Servicio</label>
            <select
              name="service"
              value={data.service}
              onChange={onChangeInput}
            >
              <option value="">Porfavor selecciona el servicio</option>
              {services.map((service) => (
                <option value={service.title} key={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="start_date">Fecha inicio</label>
            <input
              type="text"
              name="start_date"
              id="start_date"
              value={data.start_date}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="end_date">Fecha fin</label>
            <input
              type="text"
              name="end_date"
              id="end_date"
              value={data.end_date}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="days">Días</label>
            <input
              type="text"
              name="days"
              id="days"
              value={data.days}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="hours">Horas</label>
            <input
              type="text"
              name="hours"
              id="hours"
              value={data.hours}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="organization_size">Tamaño de la empresa</label>
            <input
              type="text"
              name="organization_size"
              id="organization_size"
              value={data.organization_size}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="level_difficulty">Nivel de dificultad</label>
            <input
              type="text"
              name="level_difficulty"
              id="level_difficulty"
              value={data.level_difficulty}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="col-6"></div>
        </div>
        {/*Table concept*/}
        <div className="table_concept">
          <div className="form">
            <div className="row">
              <label htmlFor="concept">Concepto</label>
              <input
                type="text"
                name="concept"
                id="concept"
                value={data.concept}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                name="price"
                id="price"
                value={data.price}
                onChange={onChangeInput}
                required
              />
            </div>
            <button onClick={onClickConcept}>agregar</button>
          </div>

          <div className="data_concept_table">
            <table className="content_table">
              <thead>
                <tr>
                  <td>concepto</td>
                  <td>precio</td>
                  <td>opcion</td>
                </tr>
              </thead>
              {detailConcept.map((concep, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{concep.concepts}</td>
                    <td>$ {concep.prices}</td>
                    <td>
                      <button onClick={() => deletConcept(index)}>
                        eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
              <thead>
                <tr>
                  <td>
                    Total: $<span>{total}</span>
                  </td>
                </tr>
              </thead>
            </table>
            <button type="submit" className="save">
              crear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateQuote;
