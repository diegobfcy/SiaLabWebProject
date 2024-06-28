import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import ClientesModal from "../modals/ClientesModal/ClientesModal";
import { crearCliente, actualizarCliente, eliminarCliente, obtenerClientes } from "../../services/ClientesService";
import ErrorModal from "../modals/ErrorModal/ErrorModal";
import "./ClientesTable.css";

const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clienteEditar, setClienteEditar] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleAddCliente = async (nuevoCliente) => {
    try {
      const clienteNuevo = await crearCliente(nuevoCliente);
      setClientes([...clientes, clienteNuevo]);
    } catch (error) {
      console.error("Error creating cliente:", error);
    }
  };

  const handleEditCliente = (cliente) => {
    setClienteEditar(cliente);
    setShowModal(true);
  };

  const handleactualizarCliente = async (clienteActualizado) => {
    try {
      const clienteActualizadoResponse = await actualizarCliente(clienteActualizado.id_cliente, clienteActualizado);
      const clientesActualizados = clientes.map((cliente) =>
        cliente.id_cliente === clienteActualizadoResponse.id_cliente ? clienteActualizadoResponse : cliente
      );
      setClientes(clientesActualizados);
    } catch (error) {
      console.error("Error updating cliente:", error);
    }
  };

  const handleeliminarCliente = async (id) => {
    try {
      await eliminarCliente(id);
      const clientesActualizados = clientes.filter((cliente) => cliente.id_cliente !== id);
      setClientes(clientesActualizados);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("No se puede eliminar el cliente debido a ...");
        setShowErrorModal(true);
      } else {
        console.error("Error deleting cliente:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClienteEditar(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="container mt-3">
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Agregar Cliente
      </Button>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>RUC</th> {/* Nueva columna para RUC */}
              <th className="options-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>{cliente.ruc}</td> {/* Mostrar RUC del cliente */}
                <td className="options-column">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => handleEditCliente(cliente)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleeliminarCliente(cliente.id_cliente)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ClientesModal
        show={showModal}
        handleClose={handleCloseModal}
        handleGuardarCliente={clienteEditar ? handleactualizarCliente : handleAddCliente}
        cliente={clienteEditar}
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </div>
  );
};

export default ClientesTable;
