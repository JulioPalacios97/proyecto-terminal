import axios from "axios";
import { useState, useEffect } from "react";

function ServicesAPI() {
  const [services, setServices] = useState([]);
  const [callback, setCallback] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get(
        `/api/services?limit=${page * 9}&title[regex]=${search}`
      );
      setServices(res.data.services);
      setResult(res.data.result);
    };
    getServices();
  }, [callback, search, page]);

  return {
    services: [services, setServices],
    callback: [callback, setCallback],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ServicesAPI;
