import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ConsultantItem({ consultant, callback, setCallback, token }) {
  const deleteConsultant = async () => {
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id: consultant.image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteConsultant = axios.delete(
        `/api/consultants/${consultant._id}`,
        {
          headers: { Authorization: token },
        }
      );

      setCallback(!callback);
      await destroyImg;
      await deleteConsultant;
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <tbody>
        <tr>
          <td>
            <img
              src={consultant.image.url}
              alt={consultant.image.url}
              style={{ width: "50px", height: "50px" }}
            />
          </td>
          <td style={{ textTransform: "uppercase" }}>{consultant.name}</td>
          <td>
            <button className="edit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/editar_consultor/${consultant._id}`}
              >
                <i className="fas fa-edit"></i>
              </Link>
            </button>{" "}
            <button
              style={{ cursor: "pointer" }}
              className="delete"
              onClick={() =>
                deleteConsultant(consultant._id, consultant.image.public_id)
              }
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default ConsultantItem;
