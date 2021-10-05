import React, { useState } from "react";
import axios from "axios";

function Registro() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const RegisterSubmit = async (e) => {
    setUser({ ...user });
    e.preventDefault();

    try {
      const res = await axios.post("/admin/register", { ...user });
      setUser({ name: "", email: "", password: "" });
      alert(res.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <section>
      <div className="login">
        <h1>Registro</h1>
        <form onSubmit={RegisterSubmit}>
          <p>Nombre</p>
          <input
            className="input-login"
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={onChangeInput}
            required
          />
          <p>Email</p>
          <input
            className="input-login"
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={onChangeInput}
            required
          />
          <p>Contraseña</p>
          <input
            className="input-login"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={onChangeInput}
          />
          <button className="login-button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Registro;
