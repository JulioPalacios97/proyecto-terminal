import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="status"
        id="status"
        required
        value={client.status}
        onChange={handleChangeInput}
      />
      <button className="content_btn" type="submit">
        {onEdit ? "Editar" : ""}
      </button>
    </form>
  );
}

export default EditClient;
