import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProductosModal from "../modals/ProductosModal/ProductosModal";
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from "../../services/ProductosService";
import ErrorModal from "../modals/ErrorModal/ErrorModal";
import "./ProductosTable.css";

const ProductosTable = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleAddProducto = async (nuevoProducto) => {
    try {
      const productoNuevo = await crearProducto(nuevoProducto);
      setProductos([...productos, productoNuevo]);
    } catch (error) {
      console.error("Error creating producto:", error);
    }
  };

  const handleEditProducto = (producto) => {
    setProductoEditar(producto);
    setShowModal(true);
  };

  const handleactualizarProducto = async (productoActualizado) => {
    try {
      const productoActualizadoResponse = await actualizarProducto(productoActualizado.id_producto, productoActualizado);
      const productosActualizados = productos.map((producto) =>
        producto.id_producto === productoActualizadoResponse.id_producto ? productoActualizadoResponse : producto
      );
      setProductos(productosActualizados);
    } catch (error) {
      console.error("Error updating producto:", error);
    }
  };

  const handleeliminarProducto = async (id) => {
    try {
      await eliminarProducto(id);
      const productosActualizados = productos.filter((producto) => producto.id_producto !== id);
      setProductos(productosActualizados);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("No se puede eliminar el producto debido a ...");
        setShowErrorModal(true);
      } else {
        console.error("Error deleting producto:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductoEditar(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="container mt-3">
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Agregar Producto
      </Button>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="options-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td className="options-column">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => handleEditProducto(producto)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleeliminarProducto(producto.id_producto)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ProductosModal
        show={showModal}
        handleClose={handleCloseModal}
        handleGuardarProducto={productoEditar ? handleactualizarProducto : handleAddProducto}
        producto={productoEditar}
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </div>
  );
};

export default ProductosTable;
