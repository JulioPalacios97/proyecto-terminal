import { useState, useEffect } from "react";
import axios from "axios";

function SectionsAPI() {
  const [sections, setSections] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSections = async () => {
      const res = await axios.get("/api/section");
      setSections(res.data);
    };
    getSections();
  }, [callback]);
  return {
    sections: [sections, setSections],
    callback: [callback, setCallback],
  };
}

export default SectionsAPI;
