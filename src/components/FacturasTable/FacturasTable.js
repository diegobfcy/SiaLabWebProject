import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaFilePdf, FaPlus } from "react-icons/fa";
import {
  listarFacturas,
  actualizarFactura,
  eliminarFactura,
  crearFacturaConPago,
  crearFacturaSinPago,
} from "../../services/FacturasService";
import FacturaModal from "../modals/FacturasModal/FacturasModal";
import generatePDF from "../../utilities/generatePDF";
import { faC } from "@fortawesome/free-solid-svg-icons";

const FacturasTable = () => {
  const [facturas, setFacturas] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFacturaModal, setShowFacturaModal] = useState(false);
  const [facturaEliminar, setFacturaEliminar] = useState(null);
  const [facturaEditar, setFacturaEditar] = useState(null);

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = async () => {
    try {
      const data = await listarFacturas();
      setFacturas(data);
    } catch (error) {
      console.error("Error fetching facturas:", error);
    }
  };

  const handleEditFactura = (factura) => {
    setFacturaEditar(factura);
    setShowFacturaModal(true);
  };

  const handleDeleteFactura = (factura) => {
    setFacturaEliminar(factura);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await eliminarFactura(facturaEliminar.id_factura);
      setShowConfirmModal(false);
      fetchFacturas();
    } catch (error) {
      console.error("Error deleting factura:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setFacturaEliminar(null);
  };

  const handleGenerarPDF = (factura) => {
    generatePDF(factura.id_factura);
    console.log(factura);
  };

  const handleAgregarFactura = () => {
    setShowFacturaModal(true);
    setFacturaEditar(null);
  };

  const handleCerrarFacturaModal = () => {
    setShowFacturaModal(false);
    setFacturaEditar(null);
  };

  const handleGuardarFactura = async (nuevaFactura) => {
    try {
      if (nuevaFactura.id_metodo_pago) {
        await crearFacturaConPago(nuevaFactura);
      } else {
        await crearFacturaSinPago(nuevaFactura);
      }
    } catch (error) {
      console.error("Error creating factura:", error);
    }
    fetchFacturas();
    setShowFacturaModal(false);
  };

  const handleGuardarEdicion = async (facturaEditada) => {
    try {
      await actualizarFactura(facturaEditada.id_factura, facturaEditada);
      fetchFacturas();
      setShowFacturaModal(false);
    } catch (error) {
      console.error("Error updating factura:", error);
    }
  };

  const estadoLabel = (estado) => {
    switch (parseInt(estado)) {
      case 0:
        return "Anulado";
      case 1:
        return "Cancelado";
      case 2:
        return "Pendiente";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Facturas</h2>
        <Button variant="success" onClick={handleAgregarFactura}>
          <FaPlus /> Agregar Factura
        </Button>
      </div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Factura</th>
              <th>Nombre Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th className="options-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id_factura}>
                <td>{factura.id_factura}</td>
                <td>{factura.nombre_cliente}</td>
                <td>{new Date(factura.fecha).toLocaleDateString()}</td>
                <td>{factura.total}</td>
                <td>{estadoLabel(factura.estado)}</td>
                <td>{factura.nombre_usuario}</td>
                <td className="options-column">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => handleEditFactura(factura)}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant="info"
                    onClick={() => handleGenerarPDF(factura)}
                  >
                    <FaFilePdf />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showConfirmModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {facturaEliminar && (
            <p>
              Si elimina la factura con ID {facturaEliminar.id_factura},
              se eliminará permanentemente. ¿Está seguro?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {facturaEditar && (
        <Modal show={showFacturaModal} onHide={handleCerrarFacturaModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Factura</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={facturaEditar.estado}
                  onChange={(e) =>
                    setFacturaEditar({
                      ...facturaEditar,
                      estado: parseInt(e.target.value, 10),
                    })
                  }
                >
                  <option value="0">Anulado</option>
                  <option value="1">Cancelado</option>
                  <option value="2">Pendiente</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => handleGuardarEdicion(facturaEditar)}
              >
                Guardar Cambios
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
      <FacturaModal
        show={showFacturaModal && !facturaEditar}
        handleClose={handleCerrarFacturaModal}
        handleGuardarFactura={handleGuardarFactura}
      />
    </div>
  );
};

export default FacturasTable;
