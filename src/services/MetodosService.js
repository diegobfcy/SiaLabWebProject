// MetodosService.js

const API_URL = 'http://localhost:3008';  // URL de tu servidor Express

// Función para obtener todos los métodos de pago
export const obtenerMetodosPago = async () => {
  const response = await fetch(`${API_URL}/metodos_pago`);
  if (!response.ok) {
    throw new Error(`Error al obtener métodos de pago: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear un nuevo método de pago
export const crearMetodoPago = async (metodo) => {
  const response = await fetch(`${API_URL}/metodos_pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metodo }),
  });
  if (!response.ok) {
    throw new Error(`Error al crear método de pago: ${response.statusText}`);
  }
  return await response.json();
};

// Función para actualizar un método de pago existente
export const actualizarMetodoPago = async (id, metodo) => {
  const response = await fetch(`${API_URL}/metodos_pago/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metodo }),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar método de pago: ${response.statusText}`);
  }
  return await response.json();
};

// Función para eliminar un método de pago
export const eliminarMetodoPago = async (id) => {
  const response = await fetch(`${API_URL}/metodos_pago/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar método de pago: ${response.statusText}`);
  }
  return await response.json();
};
