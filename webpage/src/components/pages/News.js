import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import NewsItem from "../utils/new_item/NewItem";
import FilterNews from "../filters/FilterNews";
import LoadMore from "../filters/LoadMore";
import { Helmet } from "react-helmet";

function News() {
  const state = useContext(GlobalState);
  const [noticias] = state.newsAPI.noticias;
  //console.log(state.categoriesAPI.sections);
  return (
    <div>
      <Helmet>
        <title>Noticias | Julbe'en</title>
        <meta
          name="description"
          content="Inspirar la evolución de las organizaciones"
        />
      </Helmet>
      <section className="section_banner">
        <div>
          <div className="section_titulo">
            <h1 className="text-white text-uppercase">Noticias</h1>
          </div>
        </div>
      </section>
      <div className="section-4">
        <div className="container">
          <FilterNews />
          <div className="consultores">
            {noticias.map((noticia) => {
              return <NewsItem key={noticia._id} noticia={noticia} />;
            })}
          </div>
          <LoadMore />
        </div>
      </div>
    </div>
  );
}

export default News;
