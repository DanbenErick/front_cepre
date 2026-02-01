import React, { useEffect, useState } from 'react';
import { FileText, Download, Calendar, Loader2, Search, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { resourceService } from '../../services/api';
import './PracticesPage.css';

const PracticesPage: React.FC = () => {
  const [practices, setPractices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPractices = async (criteria?: string) => {
    setLoading(true);
    try {
      const response = await resourceService.listar('PRACTICA', criteria);
      const data = response.data || response || [];
      setPractices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load practices", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractices();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPractices(searchTerm);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Sin fecha';
    try {
      return new Date(dateStr).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Sin fecha';
    }
  };

  return (
    <div className="practices-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Prácticas y Exámenes</h1>
          <p>Material de práctica para tu preparación</p>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <Input
            placeholder="Buscar práctica..."
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
          <span>Cargando prácticas...</span>
        </div>
      ) : (
        <div className="practices-list">
          {practices.length > 0 ? (
            practices.map((practice: any, index: number) => (
              <div key={practice.ID || index} className="practice-item">
                <div className="practice-icon">
                  <FileText size={24} />
                </div>

                <div className="practice-info">
                  <h3>{practice.TITULO || 'Documento sin título'}</h3>
                  <p>{practice.DESCRIPCION || 'Sin descripción'}</p>
                  <div className="practice-meta">
                    <span className="meta-item">
                      <Calendar size={14} />
                      {formatDate(practice.FECHA_REGISTRO)}
                    </span>
                    <span className="practice-type">{practice.TIPO || 'Práctica'}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  icon={practice.ENLACE ? <ExternalLink size={16} /> : <Download size={16} />}
                  onClick={() => practice.ENLACE && window.open(practice.ENLACE, '_blank')}
                  disabled={!practice.ENLACE}
                >
                  {practice.ENLACE ? 'Abrir' : 'N/D'}
                </Button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FileText size={48} />
              <p>No se encontraron prácticas</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticesPage;
