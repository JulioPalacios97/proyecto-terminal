import axios from "axios";
import { useState, useEffect } from "react";

function QuotesAPI() {
  const [quotes, setQuotes] = useState([]);
  const [callback, setCallback] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  //service

  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get(
        `/api/quote?limit=${page * 9}&${sort}&service[regex]=${search}`
      );
      setQuotes(res.data.quotes);
      setResult(res.data.result);
    };
    getQuotes();
  }, [callback, sort, search, page]);
  return {
    quotes: [quotes, setQuotes],
    callback: [callback, setCallback],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default QuotesAPI;
