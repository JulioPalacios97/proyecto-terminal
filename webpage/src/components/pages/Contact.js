import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const initialState = {
  username: "",
  email: "",
  phone: "",
  service: "",
  content: "",
};

function Contact() {
  const state = useContext(GlobalState);
  const [contact, setContact] = useState(initialState);
  const [services] = state.servicesAPI.services;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/contact", { ...contact });
      alert(res.data.msg);
      setContact(initialState);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contacto | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <section className="section_banner">
        <div>
          <div className="section_titulo">
            <h1 className="text-white text-uppercase">Contacto</h1>
          </div>
        </div>
      </section>

      <div className="contenedor row">
        <div className="col-lg-12">
          <span className="text-uppercase">¿tienes alguna duda?</span>
          <h1 className="text-uppercase">contacto</h1>
          <span className="text-aqua">campos requeridos marcados con *</span>
          <div className="spacer__sm"></div>
        </div>
        <div className="col-lg-7">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="username"
                  className="text-uppercase form-control-label"
                >
                  Nombre*
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  onChange={handleChangeInput}
                  value={contact.username}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="email"
                  className="text-uppercase form-control-label"
                >
                  correo electrónico*
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  onChange={handleChangeInput}
                  value={contact.email}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="phone"
                  className="text-uppercase form-control-label"
                >
                  teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  id="phone"
                  onChange={handleChangeInput}
                  value={contact.phone}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="service"
                className="text-uppercase form-control-label"
              >
                línea de servicio*
              </label>
              <select
                name="service"
                className="form-control text-uppercase"
                value={contact.service}
                onChange={handleChangeInput}
                required
              >
                <option>Porfavor selecciona una línea de servicio</option>
                {services.map((service) => (
                  <option value={service.title} key={service._id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="how"
                className="text-uppercase form-control-label"
              >
                ¿en qué podemos ayudarte?
              </label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                rows="3"
                onChange={handleChangeInput}
                value={contact.content}
                required
              ></textarea>
            </div>
            <button className="text-uppercase btn btn-blue" type="submit">
              enviar
            </button>
          </form>
        </div>
        <div className="col-lg-5 mt-4 mt-md-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238194.00038205355!2d-86.98931718277261!3d21.121285337641176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b05aef653db%3A0xce32b73c625fcd8a!2zQ2FuY8O6biwgUS5SLg!5e0!3m2!1ses!2smx!4v1632420877080!5m2!1ses!2smx"
            title="julbeen"
            className="ubicacion"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: "0", minHeight: "240px", maxHeight: "400px" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="spacer__m">
        <section id="directorio" className="bg-aqua-deg">
          <div className="spacer__m"></div>
          <h1 className="text-center text-white">DIRECTORIO</h1>
          <div className="spacer__sm"></div>
          <div className="row contenedor text-white mt-0 text-center">
            <div className="col-md-4 mb-4">
              <h5 className="text-white">Facebook</h5>
              <p className="mb-0">Julbe'en Consultores</p>
              <p className="font-weight-bold">
                <Link
                  to={{
                    pathname:
                      "https://www.facebook.com/Julbeen-Consultores-105883755126960/?ref=pages_you_manage",
                  }}
                  target="_blank"
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ fontSize: "20px", color: "white" }}
                  ></i>
                </Link>
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="text-white">Linkedin</h5>
              <p className="mb-0">Julbe'en Consultores</p>
              <p className="font-weight-bold">
                <Link
                  to={{
                    pathname:
                      "https://www.linkedin.com/company/74773413/admin/",
                  }}
                  target="_blank"
                >
                  <i
                    className="fab fa-linkedin-in"
                    style={{ fontSize: "20px", color: "white" }}
                  ></i>
                </Link>
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="text-white">Correo Electronico</h5>
              <p className="mb-0">Julbe'en Consultores</p>
              <p className="font-weight-bold">
                <Link
                  to={{
                    pathname: "mailto:julbeenconsultores@gmail.com",
                  }}
                  target="_blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-envelope"
                    style={{ fontSize: "20px", color: "white" }}
                  ></i>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
