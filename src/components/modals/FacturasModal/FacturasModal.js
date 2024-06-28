import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Alert } from "react-bootstrap";
import { obtenerClientes } from "../../../services/ClientesService";
import { obtenerProductos } from "../../../services/ProductosService";
import { obtenerMetodosPago } from "../../../services/MetodosService";
import { FaTrash } from "react-icons/fa";
import "./FacturasModal.css";
import { useAuth } from "../../../context/AuthContext";

const initialState = {
  cliente: "",
  idMetodoPago: "",
  detalles: [],
  sumaTotal: 0,
  error: "",
};

const FacturaModal = ({ show, handleClose, handleGuardarFactura }) => {
  const [cliente, setCliente] = useState(initialState.cliente);
  const [fecha] = useState(new Date().toISOString().split("T")[0]);
  const [idMetodoPago, setIdMetodoPago] = useState(initialState.idMetodoPago);
  const [detalles, setDetalles] = useState(initialState.detalles);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(initialState.sumaTotal);
  const [error, setError] = useState(initialState.error);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    const fetchMetodosPago = async () => {
      try {
        const data = await obtenerMetodosPago();
        setMetodosPago(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching metodos de pago:", error);
      }
    };

    fetchClientes();
    fetchProductos();
    fetchMetodosPago();
  }, []);

  useEffect(() => {
    const calcularSumaTotal = () =>
      detalles.reduce(
        (acc, detalle) => acc + (parseFloat(detalle.total) || 0),
        0
      );

    setSumaTotal(calcularSumaTotal());
  }, [detalles]);

  useEffect(() => {
    if (!show) {
      resetModal();
    }
  }, [show]);

  const resetModal = () => {
    setCliente(initialState.cliente);
    setIdMetodoPago(initialState.idMetodoPago);
    setDetalles(initialState.detalles);
    setSumaTotal(initialState.sumaTotal);
    setError(initialState.error);
  };

  const handleAgregarDetalle = () => {
    setDetalles([
      ...detalles,
      { id_producto: "", cantidad: "", precio_unitario: "", total: "" },
    ]);
  };

  const handleGuardar = () => {
    if (sumaTotal === 0) {
      setError("El total de la factura no puede ser cero.");
      return;
    }

    const estadoFactura = idMetodoPago ? "1" : "2";

    const nuevaFactura = {
      id_usuario: currentUser.id,
      id_cliente: cliente,
      fecha,
      estado: estadoFactura,
      detalles: detalles.map((detalle) => ({
        ...detalle,
        cantidad: detalle.cantidad === "" ? "0" : detalle.cantidad,
        total: detalle.total === "" ? "0" : detalle.total,
      })),
      total: sumaTotal,
      id_metodo_pago: idMetodoPago || null,
      monto_pago: sumaTotal,
      fecha_pago: fecha,
    };

    handleGuardarFactura(nuevaFactura);
    handleClose();
  };

  const handleGuardarDetalle = (index, field, value) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][field] = value;

    if (field === "id_producto") {
      const productoSeleccionado = productos.find(
        (producto) => producto.id_producto === parseInt(value)
      );
      if (productoSeleccionado) {
        nuevosDetalles[index].precio_unitario = productoSeleccionado.precio;
      } else {
        nuevosDetalles[index].precio_unitario = "";
      }
    }

    if (field === "cantidad" || field === "precio_unitario") {
      const cantidad = parseFloat(nuevosDetalles[index].cantidad) || 0;
      const precio_unitario =
        parseFloat(nuevosDetalles[index].precio_unitario) || 0;
      nuevosDetalles[index].total = (cantidad * precio_unitario).toFixed(2);
    }

    setDetalles(nuevosDetalles);
  };

  const handleEliminarDetalle = (index) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles.splice(index, 1);
    setDetalles(nuevosDetalles);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Factura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="cliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              as="select"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" value={fecha} readOnly />
          </Form.Group>

          <Form.Group controlId="idMetodoPago">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Control
              as="select"
              value={idMetodoPago}
              onChange={(e) => setIdMetodoPago(e.target.value)}
            >
              <option value="">Seleccione un método de pago</option>
              {metodosPago.map((metodo) => (
                <option key={metodo.id_metodo_pago} value={metodo.id_metodo_pago}>
                  {metodo.metodo}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      as="select"
                      value={detalle.id_producto}
                      onChange={(e) =>
                        handleGuardarDetalle(
                          index,
                          "id_producto",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Seleccione un producto</option>
                      {productos.map((producto) => (
                        <option
                          key={producto.id_producto}
                          value={producto.id_producto}
                        >
                          {producto.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={detalle.cantidad}
                      onChange={(e) =>
                        handleGuardarDetalle(index, "cantidad", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <td>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={detalle.precio_unitario}
                        readOnly
                      />
                    </td>
                  </td>
                  <td>{detalle.total}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleEliminarDetalle(index)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleAgregarDetalle}>
            Agregar Detalle
          </Button>
          <h5 className="mt-3">Total: {sumaTotal.toFixed(2)}</h5>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FacturaModal;
