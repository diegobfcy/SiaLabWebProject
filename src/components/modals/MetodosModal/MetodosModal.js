import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MetodosModal = ({ show, handleClose, handleGuardarMetodoPago, metodoPago }) => {
  const [metodo, setMetodo] = useState("");

  useEffect(() => {
    if (metodoPago) {
      setMetodo(metodoPago.metodo || "");
    } else {
      setMetodo("");
    }
  }, [metodoPago]);

  const handleGuardar = () => {
    const metodoActualizado = {
      ...metodoPago,
      metodo: metodo,
    };
    handleGuardarMetodoPago(metodoActualizado);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{metodoPago ? "Editar Método de Pago" : "Agregar Método de Pago"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="metodo">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Control
              type="text"
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          {metodoPago ? "Guardar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MetodosModal;
