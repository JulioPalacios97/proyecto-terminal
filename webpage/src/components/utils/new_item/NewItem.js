import React from "react";
import ItemModal from "../modal_new/ItemModalNew";

function NewItem({ noticia }) {
  return (
    <div>
      <div
        className="card rounded shadow"
        style={{ width: "19rem" }}
        data-toggle="modal"
        data-target={`#id${noticia._id}`}
      >
        <img
          src={noticia.image.url}
          className="card-img-top"
          alt={noticia.image.url}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-uppercase">
            {noticia.title}
          </h5>
        </div>
        <div className="card-footer">{noticia.date}</div>
      </div>
      <ItemModal
        id={`id${noticia._id}`}
        title={noticia.title}
        content={noticia.content}
        category={noticia.category}
      />
    </div>
  );
}

export default NewItem;
