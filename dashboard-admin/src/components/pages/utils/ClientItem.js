import React from "react";
import axios from "axios";

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
          <td>{client.service}</td>
          <td>{client.email}</td>
          <td>{client.phone}</td>

          <td>
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
