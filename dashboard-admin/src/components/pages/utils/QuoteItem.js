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
    /*Lugar y fecha*/
    doc.setFont("helvetica", "bold");
    doc.text(`Lugar y Fecha: `, 20, 43);
    doc.setFont("helvetica", "normal");
    doc.text(quote.place_date, 57, 43);
    /*numero de cotizacion*/
    doc.setFont("helvetica", "bold");
    doc.text(`No. Cotización: `, 20, 49);
    doc.setFont("helvetica", "normal");
    doc.text(quote.quote_number, 58, 49);
    /*nombre del cliente*/
    doc.setFont("helvetica", "bold");
    doc.text(`Nombre del cliente y/o Empresa: `, 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(quote.client_name, 99, 55);
    /*linea de servicio*/
    doc.setFont("helvetica", "bold");
    doc.text(`Linea de Servicio: `, 20, 61);
    doc.setFont("helvetica", "normal");
    doc.text(quote.service, 64, 61);
    /*fecha de inicio*/
    doc.setFont("helvetica", "bold");
    doc.text(`Fecha de Inicio del Servicio: `, 20, 67);
    doc.setFont("helvetica", "normal");
    doc.text(quote.start_date, 89, 67);
    /*fecha de termino*/
    doc.setFont("helvetica", "bold");
    doc.text(`Fecha de Término del Servicio: `, 20, 73);
    doc.setFont("helvetica", "normal");
    doc.text(quote.end_date, 95, 73);
    /*dias*/
    doc.setFont("helvetica", "bold");
    doc.text(`Días:  `, 20, 79);
    doc.setFont("helvetica", "normal");
    doc.text(quote.days, 34, 79);
    /*horas*/
    doc.setFont("helvetica", "bold");
    doc.text(`Horas: `, 20, 85);
    doc.setFont("helvetica", "normal");
    doc.text(quote.hours, 37, 85);
    /*consultor*/
    doc.setFont("helvetica", "bold");
    doc.text(`Consultor: `, 20, 91);
    doc.setFont("helvetica", "normal");
    doc.text(quote.quote_admin, 47, 91);
    /*concepto(s)*/
    doc.setFont("helvetica", "bold");
    doc.text("Concepto (s):", 20, 99);
    doc.text(`Subtotal: $${quote.subtotal.toLocaleString()}`, 156, 107);
    doc.text(`Total + IVA (16%): $${quote.total.toLocaleString()}`, 135, 115);
    doc.autoTable({
      theme: "grid",
      headStyles: { fontSize: 13, halign: "center" },
      bodyStyles: { fontSize: 11, halign: "center", textColor: "000" },
      head: [col],
      body: row,
      startY: 123,
    });
    /*dudas y aclaraciones*/
    doc.setFont("helvetica", "normal");
    doc.text("Quedo a sus órdenes para cualquier duda o aclaración", 42, 200);
    /*firma*/
    doc.setFont("helvetica", "bold");
    doc.text("---------------------------------", 80, 240);
    doc.text("Leonildo Tun Caamal", 82, 250);
    doc.text("Dirección General", 85, 255);
    doc.text("Julbe'en Consultores", 81, 260);
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
