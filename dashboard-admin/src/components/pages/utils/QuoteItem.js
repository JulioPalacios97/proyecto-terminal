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
    const col = ["Descripción del servicio", "costo (sin IVA)"];
    const row = [];

    const itemNew = quote.detailConcept;

    itemNew.forEach((element) => {
      const temp = [element.concepts, `$${element.prices}`];

      row.push(temp);
    });

    doc.addImage(logo, "PNG", 10, 10, 30, 30);
    doc.setFontSize(14);
    doc.text(`Lugar y Fecha: ${quote.place_date} `, 20, 43);
    //doc.text(`administrador: ${quote.quote_admin}`, 20, 51);
    doc.text(`No. Cotización: ${quote.quote_number}`, 20, 51);
    //doc.text(`servicio: ${quote.service}`, 20, 59);
    doc.text(`Nombre del cliente y/o Empresa: ${quote.client_name}`, 20, 59);
    /*doc.text(`fecha: ${quote.start_date}`, 20, 67);
    doc.text(quote.end_date, 68, 67);*/
    doc.text(`Linea de Servicio: ${quote.service}`, 20, 67);
    doc.text(`Fecha de Inicio del Servicio: ${quote.start_date}`, 20, 75);
    doc.text(`Fecha de Término del Servicio: ${quote.end_date}`, 20, 85);
    doc.text(`días: ${quote.days}`, 20, 95);
    doc.text(`horas: ${quote.hours}`, 20, 105);
    doc.text(`Consultor: ${quote.quote_admin}`, 20, 115);
    doc.text("Concepto (s):", 20, 125);
    //doc.autoTable(col, rows, { startY: 125 });
    doc.autoTable({
      theme: "grid",
      headStyles: { fontSize: 13, halign: "center" },
      bodyStyles: { fontSize: 11, halign: "center", textColor: "000" },
      //styles: { halign: "center", fontSize: 13, textColor: "000" },
      head: [col],
      body: row,
      startY: 135,
    });
    //doc.text(`total: $${quote.total}`, 20, 85);

    doc.text("Quedo a sus órdenes para cualquier duda o aclaración", 35, 200);
    doc.text("---------------------------------", 68, 240);
    doc.text("Leonildo Tun Caamal", 72, 250);
    doc.text("Dirección General", 72, 255);
    doc.text("Julbe'en Consultores", 72, 260);

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
