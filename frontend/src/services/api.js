const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const token = localStorage.getItem('sicJacToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.mensaje || data?.detail || 'No se pudo completar la solicitud.';
    throw new Error(message);
  }

  return data;
}

export function guardarToken(token) {
  if (token) {
    localStorage.setItem('sicJacToken', token.trim());
  } else {
    localStorage.removeItem('sicJacToken');
  }
}

export function obtenerToken() {
  return localStorage.getItem('sicJacToken') || '';
}

export const estudiantesApi = {
  listar: () => request('/api/estudiantes'),
  crear: (payload) => request('/api/estudiantes', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  actualizar: (id, payload) => request(`/api/estudiantes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  }),
  eliminar: (id) => request(`/api/estudiantes/${id}`, {
    method: 'DELETE'
  })
};
