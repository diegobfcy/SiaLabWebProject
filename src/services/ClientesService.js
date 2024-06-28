// ClientesService.js

const API_URL = 'http://localhost:3008';  // URL de tu servidor Express

// Función para obtener todos los clientes
export const obtenerClientes = async () => {
  const response = await fetch(`${API_URL}/clientes`);
  if (!response.ok) {
    throw new Error(`Error al obtener clientes: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear un nuevo cliente
export const crearCliente = async (cliente) => {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    throw new Error(`Error al crear cliente: ${response.statusText}`);
  }
  return await response.json();
};

// Función para actualizar un cliente existente
export const actualizarCliente = async (id, cliente) => {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar cliente: ${response.statusText}`);
  }
  return await response.json();
};

// Función para eliminar un cliente
export const eliminarCliente = async (id) => {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar cliente: ${response.statusText}`);
  }
  return await response.json();
};
