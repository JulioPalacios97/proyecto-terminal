import React from "react";
import ItemModal from "../modal_service/ItemModalService";

function ServiceItem({ service }) {
  return (
    <div>
      <div
        className="card rounded shadow"
        style={{ width: "19rem" }}
        data-toggle="modal"
        data-target={`#id${service._id}`}
      >
        <img
          src={service.image.url}
          className="card-img-top"
          alt={service.image.url}
        />
        <div className="card-body">
          <h5 className="card-title text-uppercase" title={service.title}>
            {service.title}
          </h5>
        </div>
      </div>
      <ItemModal
        id={`id${service._id}`}
        title={service.title}
        content={service.content}
      />
    </div>
  );
}

export default ServiceItem;
