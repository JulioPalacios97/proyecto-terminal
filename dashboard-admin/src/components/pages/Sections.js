import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";

function Sections() {
  const state = useContext(GlobalState);
  const [sections] = state.sectionsAPI.sections;
  const [section, setSection] = useState("");

  const [token, setToken] = useState("");
  const [callback, setCallback] = state.sectionsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createSection = async (e) => {
    e.preventDefault();

    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/section/${id}`,
          { name: section },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/section",
          { name: section },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setSection("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editSection = async (id, name) => {
    setID(id);
    setSection(name);
    setOnEdit(true);
  };

  const deleteSection = async (id) => {
    try {
      const res = await axios.delete(`/api/section/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);
  return (
    <div className="sections">
      <form onSubmit={createSection}>
        <label htmlFor="section">Crear Sección</label>
        <input
          type="text"
          name="section"
          value={section}
          required
          onChange={(e) => setSection(e.target.value)}
        />
        <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="col">
        {sections.map((sect) => (
          <div className="row" key={sect._id}>
            <p>{sect.name}</p>
            <div>
              <button
                onClick={() => editSection(sect._id, sect.name)}
                className="edit"
              >
                Editar
              </button>
              <button
                onClick={() => deleteSection(sect._id)}
                className="delete"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sections;
