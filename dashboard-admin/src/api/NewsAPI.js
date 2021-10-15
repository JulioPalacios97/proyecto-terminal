import axios from "axios";
import { useState, useEffect } from "react";

function NewsAPI() {
  const [news, setNews] = useState([]);
  const [callback, setCallback] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get(
        `/api/news?limit=${page * 9}&title[regex]=${search}`
      );
      setNews(res.data.news);
    };
    getServices();
  }, [callback, search, page]);
  return {
    news: [news, setNews],
    callback: [callback, setCallback],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default NewsAPI;
