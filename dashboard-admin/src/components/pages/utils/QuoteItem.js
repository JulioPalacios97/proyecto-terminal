import React from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { logo } from "../../img/logo";
import "jspdf-autotable";

function QuoteItem({ quote, callback, setCallback, token }) {
  const deleteQuote = async () => {
    try {
      const deleteQuote = axios.delete(`/api/quote/${quote._id}`, {
        headers: { Authorization: token },
      });

      setCallback(!callback);
      await deleteQuote;
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  /*const dataConcepts = () =>
    quote.detailConcept.map((quot) => {
      return (
        <li id="data-html">
          {quot.concepts}, ${quot.prices}
        </li>
      );
    });*/

  const pdfGenerate = () => {
    const doc = new jsPDF();
    const col = ["Conceptos", "precios"];
    const rows = [];
    const itemNew = quote.detailConcept;

    itemNew.forEach((element) => {
      const temp = [element.concepts, `$${element.prices}`];
      rows.push(temp);
    });

    doc.addImage(logo, "PNG", 10, 10, 30, 30);
    doc.text(`cliente: ${quote.client_name}`, 20, 43);
    doc.text(quote.client_lastname, 51, 43);
    doc.text(`administrador: ${quote.quote_admin}`, 20, 51);
    doc.text(`servicio: ${quote.service}`, 20, 59);
    doc.text(`fecha: ${quote.start_date}`, 20, 67);
    doc.text(quote.end_date, 68, 67);
    doc.text(`días: ${quote.days}`, 20, 75);
    doc.text(`horas: ${quote.hours}`, 40, 75);
    doc.autoTable(col, rows, { startY: 95 });
    doc.text(`total: $${quote.total}`, 20, 85);
    doc.save(`cotizacion${quote._id}.pdf`);
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{quote.client_name}</td>
          <td>{quote.quote_admin}</td>
          <td>{quote.service}</td>
          <td>${quote.total}</td>
          <td>
            <button
              style={{ cursor: "pointer" }}
              className="delete"
              onClick={() => deleteQuote(quote._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>{" "}
            <button
              className="print"
              style={{ cursor: "pointer" }}
              onClick={() => pdfGenerate(quote._id)}
            >
              <i className="fas fa-print"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default QuoteItem;
