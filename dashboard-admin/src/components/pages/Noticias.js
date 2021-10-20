import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import NewItem from "./utils/NewItem";

function Noticias() {
  const state = useContext(GlobalState);

  const [news] = state.newsAPI.news;
  const [callback, setCallback] = state.newsAPI.callback;
  const [token, setToken] = useState("");
  const [search, setSearch] = state.newsAPI.search;

  useEffect(() => {
    const token = localStorage.getItem("firstlogin");
    setToken(token);
  }, []);

  return (
    <div>
      <div className="details">
        <div className="table">
          <div className="cardHeader">
            <h2>Noticias Actuales</h2>
            <div className="search">
              <label>
                <input
                  type="text"
                  value={search}
                  placeholder="buscar"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <i className="fas fa-search"></i>
              </label>
            </div>
            <Link to="/crear_noticia" className="btn">
              crear
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>imagen</td>
                <td>noticia</td>
                <td>fecha</td>
                <td>categoria</td>
                <td>opciones</td>
              </tr>
            </thead>
            {news.map((noticia) => {
              return (
                <NewItem
                  key={noticia._id}
                  noticia={noticia}
                  callback={callback}
                  setCallback={setCallback}
                  token={token}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Noticias;
