import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Book, CheckCircle, Library, FileText, Users, ArrowRight } from 'lucide-react';
import './DashboardOverview.css';
import { resourceService, teacherService, attendanceService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({
    books: 0,
    practices: 0,
    teachers: 0,
    attendancePercent: 0
  });
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    const loadStats = async () => {
      try {
        const [booksResponse, practicesResponse, teachersResponse, attendanceResponse] = await Promise.all([
          resourceService.listar('LIBRO'),
          resourceService.listar('PRACTICA'),
          teacherService.listar(),
          attendanceService.consultar()
        ]);

        const booksCount = (booksResponse.data || booksResponse || []).length;
        const practicesCount = (practicesResponse.data || practicesResponse || []).length;
        const teachersCount = (teachersResponse.data || teachersResponse || []).length;

        // Calculate attendance percentage
        const attendanceData = attendanceResponse.data || attendanceResponse || [];
        const attendanceArr = Array.isArray(attendanceData) ? attendanceData : [];
        const total = attendanceArr.length;
        const asistencias = attendanceArr.filter((r: any) =>
          r.ESTADO?.toUpperCase() === 'ASISTIO' ||
          r.ESTADO?.toUpperCase() === 'PRESENTE' ||
          r.ESTADO?.toUpperCase() === 'A'
        ).length;
        const attendancePercent = total > 0 ? Math.round((asistencias / total) * 100) : 0;

        setStats({
          books: booksCount,
          practices: practicesCount,
          teachers: teachersCount,
          attendancePercent
        });
      } catch (error) {
        console.error("Error loading dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const firstName = user.nombres?.split(' ')[0] || 'Estudiante';

  return (
    <div className="dashboard-overview animate-fade-in">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <h1>¡Hola, {firstName}! 👋</h1>
          <p>Bienvenido a tu plataforma de estudios. Continúa donde lo dejaste.</p>
        </div>
        <div className="welcome-decoration"></div>
      </section>

      {/* Stats Grid */}
      <div className="stats-grid">
        <Card className="stat-card" onClick={() => navigate('/dashboard/books')}>
          <div className="stat-icon bg-blue">
            <Library size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Libros</span>
            <span className="stat-value">{loading ? '...' : stats.books}</span>
          </div>
        </Card>

        <Card className="stat-card" onClick={() => navigate('/dashboard/practices')}>
          <div className="stat-icon bg-purple">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Prácticas</span>
            <span className="stat-value">{loading ? '...' : stats.practices}</span>
          </div>
        </Card>

        <Card className="stat-card" onClick={() => navigate('/dashboard/teachers')}>
          <div className="stat-icon bg-orange">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Docentes</span>
            <span className="stat-value">{loading ? '...' : stats.teachers}</span>
          </div>
        </Card>

        <Card className="stat-card" onClick={() => navigate('/dashboard/attendance')}>
          <div className="stat-icon bg-green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Asistencia</span>
            <span className="stat-value">{loading ? '...' : `${stats.attendancePercent}%`}</span>
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <section className="quick-access">
        <h2>Acceso Rápido</h2>
        <div className="quick-grid">
          <div className="quick-card" onClick={() => navigate('/dashboard/books')}>
            <div className="quick-icon">
              <Book size={32} />
            </div>
            <div className="quick-info">
              <h3>Biblioteca</h3>
              <p>Explora libros y recursos de estudio</p>
            </div>
            <ArrowRight size={20} className="quick-arrow" />
          </div>

          <div className="quick-card" onClick={() => navigate('/dashboard/practices')}>
            <div className="quick-icon purple">
              <FileText size={32} />
            </div>
            <div className="quick-info">
              <h3>Prácticas</h3>
              <p>Descarga material de ejercicios</p>
            </div>
            <ArrowRight size={20} className="quick-arrow" />
          </div>

          <div className="quick-card" onClick={() => navigate('/dashboard/teachers')}>
            <div className="quick-icon orange">
              <Users size={32} />
            </div>
            <div className="quick-info">
              <h3>Docentes</h3>
              <p>Conoce a tu plana docente</p>
            </div>
            <ArrowRight size={20} className="quick-arrow" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverview;
