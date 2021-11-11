import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import Loading from "../../layout/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  _id: "",
};

function CreateConsultant() {
  const state = useContext(GlobalState);
  const [consultant, setConsultant] = useState(initialState);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const history = useHistory();
  const param = useParams();

  const [conultants] = state.consultantsAPI.consultants;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.consultantsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      conultants.forEach((consultant) => {
        if (consultant._id === param.id) {
          setConsultant(consultant);
          setImage(consultant.image);
        }
      });
    } else {
      setOnEdit(false);
      setConsultant(initialState);
      setImage(false);
    }
  }, [param.id, conultants]);

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
    setConsultant({ ...consultant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return alert("No a cargado una imagen");

      if (onEdit) {
        const res = await axios.put(
          `/api/consultants/${consultant._id}`,
          { ...consultant, image },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/consultants",
          { ...consultant, image },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setCallback(!callback);
      setImage(false);
      setConsultant(initialState);
      history.push("/consultores");
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
          <label htmlFor="name">Nombre del consultor</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={consultant.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Contenido</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={consultant.description}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>
        <button className="content_btn" type="submit">
          {onEdit ? "Editar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default CreateConsultant;
