import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import MetodosModal from "../modals/MetodosModal/MetodosModal";
import { obtenerMetodosPago, crearMetodoPago, actualizarMetodoPago, eliminarMetodoPago } from "../../services/MetodosService";
import ErrorModal from "../modals/ErrorModal/ErrorModal";
import "./MetodosTable.css";

const MetodosTable = () => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [metodoEditar, setMetodoEditar] = useState(null);

  useEffect(() => {
    const fetchMetodosPago = async () => {
      try {
        const data = await obtenerMetodosPago();
        setMetodosPago(data);
      } catch (error) {
        console.error("Error fetching métodos de pago:", error);
      }
    };

    fetchMetodosPago();
  }, []);

  const handleAddMetodoPago = async (nuevoMetodoPago) => {
    try {
        console.log(nuevoMetodoPago.metodo);
      const metodoNuevo = await crearMetodoPago(nuevoMetodoPago.metodo);
      setMetodosPago([...metodosPago, metodoNuevo]);
    } catch (error) {
      console.error("Error creating método de pago:", error);
    }
  };

  const handleEditMetodoPago = (metodoPago) => {
    setMetodoEditar(metodoPago);
    setShowModal(true);
  };

  const handleactualizarMetodoPago = async (metodoActualizado) => {
    try {
      const metodoActualizadoResponse = await actualizarMetodoPago(metodoActualizado.id_metodo_pago, metodoActualizado.metodo);
      const metodosActualizados = metodosPago.map((metodo) =>
        metodo.id_metodo_pago === metodoActualizadoResponse.id_metodo_pago ? metodoActualizadoResponse : metodo
      );
      setMetodosPago(metodosActualizados);
    } catch (error) {
      console.error("Error updating método de pago:", error);
    }
  };

  const handleeliminarMetodoPago = async (id) => {
    try {
      await eliminarMetodoPago(id);
      const metodosActualizados = metodosPago.filter((metodo) => metodo.id_metodo_pago !== id);
      setMetodosPago(metodosActualizados);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("No se puede eliminar el método de pago debido a ...");
        setShowErrorModal(true);
      } else {
        console.error("Error deleting método de pago:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMetodoEditar(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="container mt-3">
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Agregar Método de Pago
      </Button>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Método</th>
              <th className="options-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {metodosPago.map((metodo) => (
              <tr key={metodo.id_metodo_pago}>
                <td>{metodo.id_metodo_pago}</td>
                <td>{metodo.metodo}</td>
                <td className="options-column">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => handleEditMetodoPago(metodo)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleeliminarMetodoPago(metodo.id_metodo_pago)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <MetodosModal
        show={showModal}
        handleClose={handleCloseModal}
        handleGuardarMetodoPago={metodoEditar ? handleactualizarMetodoPago : handleAddMetodoPago}
        metodoPago={metodoEditar}
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </div>
  );
};

export default MetodosTable;
