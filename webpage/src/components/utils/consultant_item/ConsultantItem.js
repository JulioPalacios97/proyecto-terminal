import React from "react";
import ItemModal from "../modal_consultant/ItemModalConsultant";

function ConsultantItem({ consultant }) {
  return (
    <div>
      <div
        className="card rounded shadow"
        style={{ width: "19rem" }}
        data-toggle="modal"
        data-target={`#id${consultant._id}`}
      >
        <img
          src={consultant.image.url}
          className="card-img-top"
          alt={consultant.image.url}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-uppercase">
            {consultant.name}
          </h5>
        </div>
      </div>
      <ItemModal
        id={`id${consultant._id}`}
        name={consultant.name}
        description={consultant.description}
      />
    </div>
  );
}

export default ConsultantItem;
