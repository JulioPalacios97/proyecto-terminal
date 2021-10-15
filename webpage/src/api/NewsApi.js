import { useState, useEffect } from "react";
import axios from "axios";

function NewsApi() {
  const [noticias, setNoticias] = useState([]);
  const [category, setCategory] = useState("");
  //const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get(`/api/news?limit=${page * 9}&${category}`);
      setNoticias(res.data.news);
      setResult(res.data.result);
    };
    getNews();
  }, [category /*search,*/, page]);
  return {
    noticias: [noticias, setNoticias],
    category: [category, setCategory],
    //search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default NewsApi;
