import React, { useState } from 'react';
import { User, Smartphone, LogIn, GraduationCap, AlertCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import './Login.css';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dni: '',
    celular: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Usar el servicio real
      const response = await authService.login(formData.dni, formData.celular);

      console.log('Login success:', response);

      // Guardar sesión
      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        const userData = {
          ...response.estudiante,
          rol: response.rol
        };
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/dashboard');
      } else {
        throw new Error(response.message || 'Error desconocido');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      // Ajuste para capturar el mensaje de error correctamente si viene del interceptor o del try/catch
      const errorMessage = err.message || err.error || 'Error al iniciar sesión. Verifique sus credenciales.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="login-container glass-panel animate-fade-in">
        <div className="login-header">
          <div className="logo-container">
            <GraduationCap size={32} color="var(--accent)" />
          </div>
          <h1>Bienvenido</h1>
          <p>Plataforma Estudiantil CEPRE UNDAC</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="DNI"
            placeholder="Ingrese su número de DNI"
            icon={<User size={18} />}
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            required
            maxLength={8}
          />

          <Input
            type="tel"
            label="Celular"
            placeholder="Ingrese su número de celular reg."
            icon={<Smartphone size={18} />}
            value={formData.celular}
            onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
            required
            maxLength={9}
          />

          <Button
            type="submit"
            className="w-full mt-2"
            isLoading={loading}
            icon={<LogIn size={18} />}
          >
            Ingresar
          </Button>
        </form>

        <div className="login-footer">
          <p>¿Problemas para ingresar? Contacte a soporte.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
