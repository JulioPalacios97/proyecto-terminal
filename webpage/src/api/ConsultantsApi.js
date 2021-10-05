import { useState, useEffect } from "react";
import axios from "axios";

function ConsultantsApi() {
  const [consultants, setConsultants] = useState([]);

  const getConsulants = async () => {
    const res = await axios.get("/api/consultants");
    setConsultants(res.data.consultants);
  };

  useEffect(() => {
    getConsulants();
  }, []);
  return {
    consultants: [consultants, setConsultants],
  };
}

export default ConsultantsApi;
