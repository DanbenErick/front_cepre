import React, { useEffect, useState } from 'react';
import { Book, Download, Loader2, Search, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { resourceService } from '../../services/api';
import './BooksPage.css';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async (criteria?: string) => {
    setLoading(true);
    try {
      const response = await resourceService.listar('LIBRO', criteria);
      const data = response.data || response || [];
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  const colors = ['gradient-green', 'gradient-blue', 'gradient-purple', 'gradient-orange'];
  const getColor = (index: number) => colors[index % colors.length];

  return (
    <div className="books-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Biblioteca Virtual</h1>
          <p>Material bibliográfico seleccionado para tu preparación</p>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <Input
            placeholder="Buscar libro..."
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
          <span>Cargando libros...</span>
        </div>
      ) : (
        <div className="books-grid">
          {books.length > 0 ? (
            books.map((book: any, index: number) => (
              <div key={book.ID || index} className="book-card">
                <div className={`book-cover ${getColor(index)}`}>
                  <Book size={40} />
                </div>
                <div className="book-content">
                  <span className="book-category">{book.TIPO || 'Libro'}</span>
                  <h3 className="book-title">{book.TITULO || 'Sin Título'}</h3>
                  <p className="book-description">{book.DESCRIPCION || 'Sin descripción'}</p>

                  <Button
                    variant="primary"
                    className="w-full"
                    icon={book.ENLACE ? <ExternalLink size={16} /> : <Download size={16} />}
                    onClick={() => book.ENLACE && window.open(book.ENLACE, '_blank')}
                    disabled={!book.ENLACE}
                  >
                    {book.ENLACE ? 'Abrir Recurso' : 'No disponible'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Book size={48} />
              <p>No se encontraron libros</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
