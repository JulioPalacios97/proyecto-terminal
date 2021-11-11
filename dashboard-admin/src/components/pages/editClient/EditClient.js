import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
  username: "",
  email: "",
  phone: "",
  service: "",
  content: "",
  status: "",
};

function EditClient() {
  const state = useContext(GlobalState);
  const [clients] = state.clientsAPI.clients;
  const [client, setClient] = useState(initialState);
  const [token, setToken] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.clientsAPI.callback;
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      clients.forEach((client) => {
        if (client._id === param.id) {
          setClient(client);
        }
      });
    } else {
      setOnEdit(false);
      setClient(initialState);
    }
  }, [param.id, clients]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/contact/${client._id}`,
          { ...client },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setCallback(!callback);
      setClient(initialState);
      history.push("/clientes");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);
  return (
    <div className="create_content">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="username">Nombre del cliente</label>
          <input
            type="text"
            name="username"
            id="username"
            value={client.username}
            disabled
          />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={client.email}
            disabled
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Telefono</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={client.phone}
            disabled
          />
        </div>
        <div className="row">
          <label htmlFor="service">Línea de servicio</label>
          <input
            type="text"
            name="service"
            id="service"
            value={client.service}
            disabled
          />
        </div>
        <div className="row">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            required
            value={client.status}
            onChange={handleChangeInput}
          >
            <option value="">Selecciona el status</option>
            <option value="en proceso">en proceso</option>
            <option value="atendido">atendido</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="content">Mensaje</label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={client.content}
            rows="4"
            disabled
          />
        </div>
        <button className="content_btn" type="submit">
          {onEdit ? "Editar" : ""}
        </button>
      </form>
    </div>
  );
}

export default EditClient;
