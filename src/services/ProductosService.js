// ProductosService.js

const API_URL = 'http://localhost:3008';  // URL de tu servidor Express

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear un producto nuevo
export const crearProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error(`Error al crear producto: ${response.statusText}`);
  }
  return await response.json();
};

// Función para actualizar un producto existente
export const actualizarProducto = async (id, producto) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar producto: ${response.statusText}`);
  }
  return await response.json();
};

// Función para eliminar un producto
export const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar producto: ${response.statusText}`);
  }
  return await response.json();
};
