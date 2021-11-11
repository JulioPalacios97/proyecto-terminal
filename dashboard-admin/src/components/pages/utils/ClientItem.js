import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ClientItem({ client, callback, setCallback, token }) {
  const deleteClient = async () => {
    try {
      const deleteClient = axios.delete(`/api/contact/${client._id}`, {
        headers: { Authorization: token },
      });

      setCallback(!callback);
      await deleteClient;
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{client.username}</td>
          <td
            style={{
              fontWeight: "bold",
              color:
                (client.status === "nuevo" && "red") ||
                (client.status === "atendido" && "#1acf02") ||
                (client.status === "en proceso" && "#f9d50a"),
            }}
          >
            {client.status}
          </td>
          <td>{client.email}</td>
          <td>{client.phone}</td>

          <td>
            <button className="edit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/editar_cliente/${client._id}`}
              >
                <i className="fas fa-edit"></i>
              </Link>
            </button>{" "}
            <button
              style={{ cursor: "pointer" }}
              className="delete"
              onClick={() => deleteClient(client._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default ClientItem;
