import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";

function Pagination() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.newsAPI.page;
  const [result] = state.newsAPI.result;
  return (
    <div className="load_more">
      {result < page * 9 ? (
        ""
      ) : (
        <button className="btn btn-blue" onClick={() => setPage(page + 1)}>
          Cargar Mas
        </button>
      )}
    </div>
  );
}

export default Pagination;
