import jsPDF from "jspdf";
import "jspdf-autotable";
import { obtenerFacturaDetallada } from "../services/FacturasService";

const generatePDF = async (facturaId, fileName) => {
  try {
    const factura = await obtenerFacturaDetallada(facturaId);

    // Crear un documento PDF
    const pdf = new jsPDF();

    // Configurar título centrado
    pdf.setFontSize(18);
    pdf.text("Factura Detallada", pdf.internal.pageSize.getWidth() / 2, 22, { align: "center", decoration: "underline" });

    // Configurar datos de usuario y fecha de impresión
    const fechaActual = new Date().toLocaleDateString();
    pdf.setFontSize(12);
    pdf.text(`Usuario: ${factura.usuario_nombre}`, pdf.internal.pageSize.getWidth() - 14, 32, { align: "right" });
    pdf.text(`Fecha de impresión: ${fechaActual}`, pdf.internal.pageSize.getWidth() - 14, 42, { align: "right" });

    // Configurar datos del cliente
    pdf.setFontSize(12);
    pdf.text(`Cliente: ${factura.nombre_cliente}`, 14, 52);
    pdf.text(`Dirección: ${factura.direccion_cliente}`, 14, 62);
    pdf.text(`RUC: ${factura.ruc_cliente}`, 14, 72);

    // Configurar datos de la factura
    const fechaFactura = formatDate(factura.fecha_factura);
    pdf.text(`Fecha: ${fechaFactura}`, 14, 82);
    pdf.text(`Total: ${formatCurrency(factura.total_factura)}`, 14, 92);
    pdf.text(`Estado: ${getEstadoFactura(factura.estado_factura)}`, 14, 102);

    // Configurar tabla de detalles de la factura usando jspdf-autotable
    const columns = ["Producto", "Cantidad", "Precio Unitario", "Total"];
    const rows = factura.detalles_factura.map(detalle => [
      detalle.nombre_producto,
      detalle.cantidad_producto,
      formatCurrency(detalle.precio_unitario_producto),
      formatCurrency(detalle.total)
    ]);

    pdf.autoTable({
      startY: 110,
      head: [columns],
      body: rows,
      theme: "grid",
      styles: {
        cellPadding: 2,
        fontSize: 10,
      },
    });

    // Configurar total
    const totalRows = [["Total", "", "", formatCurrency(factura.total_factura)]];

    pdf.autoTable({
      startY: pdf.lastAutoTable.finalY + 10,
      body: totalRows,
      theme: "grid",
      styles: {
        cellPadding: 2,
        fontSize: 10,
        fontStyle: "bold",
      },
    });

    // Guardar el PDF con el nombre especificado
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};

// Función para formatear montos como moneda peruana (Soles)
const formatCurrency = (value) => {
  return `S/ ${value.toFixed(2)}`; // Asumiendo que value es un número
};

// Función para formatear la fecha
const formatDate = (dateString) => {
  // Eliminar la "T" y todo lo que está después
  const formattedDate = dateString.split('T')[0];
  const [year, month, day] = formattedDate.split('-');
  // Retornar la fecha formateada como dd/mm/aa
  return `${day}/${month}/${year}`;
};

// Función para obtener el estado de la factura como texto
const getEstadoFactura = (estado) => {
  const estados = {
    0: 'Anulado',
    1: 'Cancelado',
    2: 'Pendiente'
  };
  return estados[estado] || 'Desconocido';
};

export default generatePDF;
