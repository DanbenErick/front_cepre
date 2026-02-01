import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  // Try to get token from localStorage (assuming it's stored as 'token' or inside 'user')
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export interface LoginResponse {
  ok: boolean;
  message: string;
  estudiante?: any;
  rol?: string;
  token?: string;
  expiresAt?: number;
}

export const authService = {
  login: async (dni: string, celular: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/sistema/admin/login-estudiante-cepre', { dni, celular });
      return response.data;
    } catch (error: any) {
      // Si el servidor responde con error (4xx, 5xx), axios lo lanza.
      // Retornamos el data del error si existe, para manejarlo en el componente.
      if (error.response && error.response.data) {
          throw error.response.data;
      }
      throw { ok: false, message: 'Error de conexión o servidor no disponible' };
    }
  },
};

export const resourceService = {
  listar: async (tipo?: 'LIBRO' | 'PRACTICA', criterio?: string) => {
    try {
      const response = await api.post('/administrador/recursos/listar-recursos', { 
        TIPO: tipo, 
        CRITERIO_BUSQUEDA: criterio 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching resources:', error);
      return { success: false, data: [] };
    }
  }
};

export const teacherService = {
  listar: async (criterio?: string) => {
    try {
      const response = await api.post('/administrador/profesores/listar-profesores', { 
        CRITERIO_BUSQUEDA: criterio 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching teachers:', error);
      return { success: false, data: [] };
    }
  }
};

export const attendanceService = {
  consultar: async (dni?: string, id_proceso?: number) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await api.post('/input-controls/consultar-asistencia-cepre', { 
        dni: dni || user.dni,
        id_proceso 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching attendance:', error);
      return { success: false, data: [] };
    }
  }
};

export default api;
