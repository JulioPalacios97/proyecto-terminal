import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function NewItem({ noticia, callback, setCallback, token }) {
  const deleteNoticia = async () => {
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id: noticia.image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteNoticia = axios.delete(`/api/news/${noticia._id}`, {
        headers: { Authorization: token },
      });

      setCallback(!callback);
      await destroyImg;
      await deleteNoticia;
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
              src={noticia.image.url}
              alt={noticia.image.url}
              style={{ width: "50px", height: "50px" }}
            />
          </td>
          <td style={{ textTransform: "uppercase" }}>{noticia.title}</td>
          <td>{noticia.date}</td>
          <td>{noticia.category}</td>
          <td>
            <button className="edit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/editar_noticia/${noticia._id}`}
              >
                <i className="fas fa-edit"></i>
              </Link>
            </button>{" "}
            <button
              style={{ cursor: "pointer" }}
              className="delete"
              onClick={() =>
                deleteNoticia(noticia._id, noticia.image.public_id)
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

export default NewItem;
