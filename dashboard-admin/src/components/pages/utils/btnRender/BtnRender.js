import React from "react";

function BtnRender({ service, deleteService }) {
  //console.log(service);
  return (
    <>
      <button
        style={{ cursor: "pointer" }}
        className="delete"
        onClick={() => deleteService(service._id, service.image.public_id)}
      >
        <i className="fas fa-trash-alt"></i>
      </button>{" "}
    </>
  );
}

export default BtnRender;
