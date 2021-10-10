import React, { useState } from "react";
import axios from "axios";

function Login({ setLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/admin/login", { ...user });
      localStorage.setItem("firstlogin", res.data.accesstoken);
      setLogin(true);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <section>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={loginSubmit}>
          <input
            className="input-login"
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={onChangeInput}
            required
          />
          <input
            className="input-login"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={onChangeInput}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
