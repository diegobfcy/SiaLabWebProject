import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ClientesModal = ({ show, handleClose, handleGuardarCliente, cliente }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ruc, setRuc] = useState(""); // Nuevo estado para RUC

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre || "");
      setDireccion(cliente.direccion || "");
      setTelefono(cliente.telefono || "");
      setEmail(cliente.email || "");
      setRuc(cliente.ruc || ""); // Actualizar estado para RUC
    } else {
      setNombre("");
      setDireccion("");
      setTelefono("");
      setEmail("");
      setRuc(""); // Reiniciar estado para RUC
    }
  }, [cliente]);

  const handleGuardar = () => {
    const clienteActualizado = {
      ...cliente,
      nombre,
      direccion,
      telefono,
      email,
      ruc, // Incluir el campo RUC en el objeto cliente actualizado
    };
    handleGuardarCliente(clienteActualizado);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cliente ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="ruc">
            <Form.Label>RUC</Form.Label>
            <Form.Control
              type="text"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          {cliente ? "Guardar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientesModal;
