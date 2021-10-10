import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./btnRender/BtnRender";

function ServiceItem({ service, callback, setCallback, token }) {
  const deleteService = async () => {
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id: service.image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteService = axios.delete(`/api/services/${service._id}`, {
        headers: { Authorization: token },
      });

      setCallback(!callback);
      await destroyImg;
      await deleteService;
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
              src={service.image.url}
              alt={service.image.url}
              style={{ width: "50px", height: "50px" }}
            />
          </td>
          <td style={{ textTransform: "uppercase" }}>{service.title}</td>
          <td>
            <button className="edit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/editar_servicio/${service._id}`}
              >
                <i className="fas fa-edit"></i>
              </Link>
            </button>{" "}
            <BtnRender service={service} deleteService={deleteService} />
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default ServiceItem;
