const API_URL = 'http://localhost:3008';  // URL de tu servidor Express


// Función para obtener todas las facturas
export const listarFacturas = async () => {
  const response = await fetch(`${API_URL}/facturas`);
  if (!response.ok) {
    throw new Error(`Error al obtener facturas: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear una nueva factura con pago
export const crearFacturaConPago = async (facturaConPago) => {
  const response = await fetch(`${API_URL}/facturas_con_pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(facturaConPago),
  });

  if (!response.ok) {
    throw new Error(`Error al crear factura con pago: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear una nueva factura sin pago
export const crearFacturaSinPago = async (facturaSinPago) => {
  const response = await fetch(`${API_URL}/facturas_sin_pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(facturaSinPago),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Error al crear factura sin pago: ${response.statusText}`);
  }
  return await response.json();
};

// Función para actualizar una factura existente
export const actualizarFactura = async (id, factura) => {
  const response = await fetch(`${API_URL}/facturas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(factura),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar factura: ${response.statusText}`);
  }
  return await response.json();
};

// Función para eliminar una factura
export const eliminarFactura = async (id) => {
  const response = await fetch(`${API_URL}/facturas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar factura: ${response.statusText}`);
  }
  return await response.json();
};
export const obtenerFacturaDetallada = async (id) => {
    const response = await fetch(`${API_URL}/facturas/${id}/detallada`);
    if (!response.ok) {
      throw new Error(`Error al obtener detalles de la factura: ${response.statusText}`);
    }
    return await response.json();
  };
