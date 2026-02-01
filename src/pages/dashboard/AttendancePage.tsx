import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { CalendarCheck, Loader2, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { attendanceService } from '../../services/api';
import './AttendancePage.css';

interface AttendanceRecord {
  FECHA: string;
  ESTADO: string;
  HORA_ENTRADA?: string;
  CLASE?: string;
  // Add more fields as needed based on API response
}

const AttendancePage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    asistencias: 0,
    faltas: 0,
    tardanzas: 0,
    porcentaje: 0
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await attendanceService.consultar();
        const data = response.data || response || [];
        const attendanceData = Array.isArray(data) ? data : [];
        setRecords(attendanceData);

        // Calculate stats
        const total = attendanceData.length;
        const asistencias = attendanceData.filter((r: any) =>
          r.ESTADO?.toUpperCase() === 'ASISTIO' ||
          r.ESTADO?.toUpperCase() === 'PRESENTE' ||
          r.ESTADO?.toUpperCase() === 'A'
        ).length;
        const tardanzas = attendanceData.filter((r: any) =>
          r.ESTADO?.toUpperCase() === 'TARDANZA' ||
          r.ESTADO?.toUpperCase() === 'T'
        ).length;
        const faltas = total - asistencias - tardanzas;

        setStats({
          total,
          asistencias,
          faltas,
          tardanzas,
          porcentaje: total > 0 ? Math.round((asistencias / total) * 100) : 0
        });
      } catch (error) {
        console.error('Error loading attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const getStatusIcon = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'ASISTIO' || s === 'PRESENTE' || s === 'A') {
      return <CheckCircle size={16} className="text-success" />;
    }
    if (s === 'TARDANZA' || s === 'T') {
      return <Clock size={16} className="text-warning" />;
    }
    return <XCircle size={16} className="text-error" />;
  };

  const getStatusClass = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'ASISTIO' || s === 'PRESENTE' || s === 'A') return 'status-success';
    if (s === 'TARDANZA' || s === 'T') return 'status-warning';
    return 'status-error';
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('es-PE', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="attendance-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Mi Asistencia</h1>
          <p>Historial detallado de asistencias</p>
        </div>
      </div>

      {/* Stats */}
      <div className="attendance-stats">
        <Card className="stat-card">
          <div className="stat-icon bg-green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Asistencias</span>
            <span className="stat-value">{stats.asistencias}</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon bg-orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tardanzas</span>
            <span className="stat-value">{stats.tardanzas}</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon bg-red">
            <XCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Faltas</span>
            <span className="stat-value">{stats.faltas}</span>
          </div>
        </Card>

        <Card className="stat-card highlight">
          <div className="stat-icon bg-accent">
            <CalendarCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Porcentaje</span>
            <span className="stat-value">{stats.porcentaje}%</span>
          </div>
        </Card>
      </div>

      {/* Records */}
      <Card title="Historial de Asistencias">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="animate-spin" size={40} />
            <span>Cargando registros...</span>
          </div>
        ) : records.length > 0 ? (
          <div className="attendance-list">
            {records.map((record, index) => (
              <div key={index} className="attendance-item">
                <div className="attendance-date">
                  <CalendarCheck size={18} />
                  <span>{formatDate(record.FECHA)}</span>
                </div>
                {record.CLASE && (
                  <div className="attendance-class">
                    {record.CLASE}
                  </div>
                )}
                {record.HORA_ENTRADA && (
                  <div className="attendance-time">
                    <Clock size={14} />
                    <span>{record.HORA_ENTRADA}</span>
                  </div>
                )}
                <div className={`attendance-status ${getStatusClass(record.ESTADO)}`}>
                  {getStatusIcon(record.ESTADO)}
                  <span>{record.ESTADO || 'Sin estado'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <AlertCircle size={48} />
            <p>No hay registros de asistencia</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendancePage;
