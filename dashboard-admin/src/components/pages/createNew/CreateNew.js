import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import Loading from "../../layout/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  title: "",
  content: "",
  category: "",
  date: "",
  _id: "",
};

function CreateNew() {
  const state = useContext(GlobalState);
  const [noticia, setNoticia] = useState(initialState);

  const [sections] = state.sectionsAPI.sections;

  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const history = useHistory();
  const param = useParams();

  const [noticias] = state.newsAPI.news;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.newsAPI.callback;
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      noticias.forEach((noticia) => {
        if (noticia._id === param.id) {
          setNoticia(noticia);
          setImage(noticia.image);
        }
      });
    } else {
      setOnEdit(false);
      setNoticia(initialState);
      setImage(false);
    }
  }, [param.id, noticias]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("El archivo no existe");

      if (file.size > 1024 * 1024) return alert("Archivo grande"); //1mb

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Formato del archivo incorrecto"); //1mb

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async (e) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNoticia({ ...noticia, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return alert("No a cargado una imagen");

      if (onEdit) {
        const res = await axios.put(
          `/api/news/${noticia._id}`,
          { ...noticia, image },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/news",
          { ...noticia, image },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setCallback(!callback);
      setImage(false);
      setNoticia(initialState);
      history.push("/noticias");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);

  return (
    <div className="create_content">
      <div className="upload">
        <input
          type="file"
          name="file"
          id="file_upload"
          onChange={handleUpload}
        />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={noticia.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="date">Fecha</label>
          <input
            type="text"
            name="date"
            id="date"
            required
            value={noticia.date}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Contenido</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={noticia.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="sections">Categoria: </label>
          <select
            name="category"
            value={noticia.category}
            onChange={handleChangeInput}
          >
            <option value="">Selecciona una categoria</option>
            {sections.map((section) => (
              <option value={section.name} key={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        <button className="content_btn" type="submit">
          {onEdit ? "Editar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default CreateNew;
