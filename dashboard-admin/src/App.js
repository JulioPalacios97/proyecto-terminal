import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import axios from "axios";
import Layout from "./components/layout/Layout";
import Login from "./components/pages/auth/Login";

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("firstlogin");
      if (token) {
        const verified = await axios.get("/admin/infor", {
          headers: { Authorization: token },
        });
        setLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setLogin(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <DataProvider>
      <Router>
        {isLogin ? (
          <Layout setLogin={setLogin} />
        ) : (
          <Login setLogin={setLogin} />
        )}
      </Router>
    </DataProvider>
  );
}

export default App;
