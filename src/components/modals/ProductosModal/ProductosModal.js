import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProductosModal = ({ show, handleClose, handleGuardarProducto, producto }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre || "");
      setDescripcion(producto.descripcion || "");
      setPrecio(producto.precio || 0);
      setStock(producto.stock || 0);
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio(0);
      setStock(0);
    }
  }, [producto]);

  const handleGuardar = () => {
    const productoActualizado = {
      ...producto,
      nombre,
      descripcion,
      precio,
      stock,
    };
    handleGuardarProducto(productoActualizado);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{producto ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
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
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          {producto ? "Guardar" : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductosModal;
