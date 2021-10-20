import React from "react";

function ItemModalNew({ id, title, content, category }) {
  return (
    <div>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ textTransform: "uppercase" }}
              >
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              style={{ textAlign: "justify" }}
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <div className="modal-footer">
              <p style={{ color: "crimson" }}>{category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModalNew;
