import { useState, useEffect } from "react";
import axios from "axios";

function ServicesApi() {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    const res = await axios.get("/api/services");
    setServices(res.data.services);
  };

  useEffect(() => {
    getServices();
  }, []);
  return {
    services: [services, setServices],
  };
}

export default ServicesApi;
