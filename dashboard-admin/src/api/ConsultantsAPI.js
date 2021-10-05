import axios from "axios";
import { useState, useEffect } from "react";

function ConsultantsAPI() {
  const [consultants, setConsultants] = useState([]);
  const [callback, setCallback] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getConsultants = async () => {
      const res = await axios.get(
        `/api/consultants?limit=${page * 9}&name[regex]=${search}`
      );
      setConsultants(res.data.consultants);
      setResult(res.data.result);
    };
    getConsultants();
  }, [callback, search, page]);
  return {
    consultants: [consultants, setConsultants],
    callback: [callback, setCallback],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ConsultantsAPI;
