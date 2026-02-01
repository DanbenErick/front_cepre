import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Mail, Phone, Loader2, Search, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { teacherService } from '../../services/api';
import './TeachersPage.css';

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async (criteria?: string) => {
    setLoading(true);
    try {
      const response = await teacherService.listar(criteria);
      const data = response.data || response || [];
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load teachers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTeachers(searchTerm);
  };

  const colors = ['bg-green', 'bg-blue', 'bg-purple', 'bg-orange', 'bg-pink', 'bg-teal'];

  const getColor = (index: number) => colors[index % colors.length];

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="teachers-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Plana Docente</h1>
          <p>Conoce y contacta a tus profesores</p>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <Input
            placeholder="Buscar docente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
          <Button type="submit" variant="primary">Buscar</Button>
        </form>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={40} />
          <span>Cargando docentes...</span>
        </div>
      ) : (
        <div className="teachers-grid">
          {teachers.length > 0 ? (
            teachers.map((teacher: any, index: number) => {
              const fullName = `${teacher.NOMBRES || ''} ${teacher.AP_PATERNO || ''} ${teacher.AP_MATERNO || ''}`.trim() || 'Desconocido';

              let courses: string[] = [];
              try {
                if (teacher.MATERIAS) {
                  const subjects = JSON.parse(teacher.MATERIAS);
                  courses = Array.isArray(subjects) ? subjects : [teacher.MATERIAS];
                }
              } catch (e) {
                courses = teacher.MATERIAS ? [teacher.MATERIAS] : [];
              }

              return (
                <Card key={teacher.ID || index} className="teacher-card">
                  <div className="teacher-header">
                    <div className={`teacher-avatar ${getColor(index)}`}>
                      {getInitials(fullName)}
                    </div>
                    <div className="teacher-info">
                      <h3>{fullName}</h3>
                      <div className="subject-badges">
                        {courses.map((course, i) => (
                          <span key={i} className="badge">{course.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="teacher-contact">
                    {teacher.EMAIL && (
                      <a href={`mailto:${teacher.EMAIL}`} className="contact-item">
                        <Mail size={16} />
                        <span>{teacher.EMAIL}</span>
                      </a>
                    )}
                    {teacher.CELULAR && (
                      <a href={`tel:${teacher.CELULAR}`} className="contact-item">
                        <Phone size={16} />
                        <span>{teacher.CELULAR}</span>
                      </a>
                    )}
                  </div>

                  <div className="teacher-actions">
                    {teacher.CELULAR && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        icon={<MessageCircle size={16} />}
                        onClick={() => window.open(`https://wa.me/51${teacher.CELULAR}`, '_blank')}
                      >
                        WhatsApp
                      </Button>
                    )}
                    {teacher.EMAIL && (
                      <Button
                        variant="primary"
                        className="flex-1"
                        icon={<Mail size={16} />}
                        onClick={() => window.location.href = `mailto:${teacher.EMAIL}`}
                      >
                        Email
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="empty-state">
              <p>No se encontraron docentes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
