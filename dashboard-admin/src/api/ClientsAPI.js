import axios from "axios";
import { useState, useEffect } from "react";

function ClientsAPI() {
  const [clients, setClients] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get("/api/contact");
      setClients(res.data);
    };
    getServices();
  }, [callback, setClients]);
  return {
    clients: [clients, setClients],
    callback: [callback, setCallback],
  };
}

export default ClientsAPI;
