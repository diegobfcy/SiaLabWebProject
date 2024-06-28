// UsuariosService.js

const API_URL = 'http://localhost:3008';  // URL de tu servidor Express

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const response = await fetch(`${API_URL}/usuarios`);
  if (!response.ok) {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
  return await response.json();
};

// Función para crear un usuario
export const crearUsuario = async (usuario) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error(`Error al crear usuario: ${response.statusText}`);
  }
  return await response.json();
};

// Función para actualizar un usuario
export const actualizarUsuario = async (id, usuario) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar usuario: ${response.statusText}`);
  }
  return await response.json();
};

// Función para eliminar un usuario
export const eliminarUsuario = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar usuario: ${response.statusText}`);
  }
  return await response.json();
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`Error al registrar usuario: ${response.statusText}`);
  }
  return await response.json();
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

// Función para enviar el correo de restablecimiento de contraseña
export const sendResetEmail = async (email) => {
  const response = await fetch(`${API_URL}/send-reset-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error(`Error al enviar correo de restablecimiento: ${response.statusText}`);
  }
  return await response.json();
};
