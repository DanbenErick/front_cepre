# 🎓 CEPRE UNDAC - Portal Estudiantil

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Plataforma web moderna para estudiantes del Centro Pre-Universitario de la Universidad Nacional Daniel Alcides Carrión**

[Características](#-características) •
[Instalación](#-instalación) •
[Tecnologías](#-tecnologías) •
[Estructura](#-estructura-del-proyecto)

</div>

---

## ✨ Características

### 🔐 Autenticación
- Login seguro con DNI y número de celular
- Gestión de sesión con tokens JWT
- Rutas protegidas para usuarios autenticados

### 📚 Biblioteca Virtual
- Acceso a libros y material de estudio
- Descarga directa de recursos PDF
- Búsqueda y filtrado de contenido

### 📝 Prácticas y Exámenes
- Material de práctica organizado por curso
- Fechas de publicación y categorías
- Descarga rápida de documentos

### 👥 Directorio Docente
- Información de contacto de profesores
- Materias asignadas con badges visuales
- Enlaces directos a WhatsApp y Email

### 📊 Control de Asistencia
- Visualización de historial de asistencias
- Estadísticas: asistencias, tardanzas, faltas
- Porcentaje de asistencia en tiempo real

### 🎨 Diseño Moderno
- Tema oscuro estilo Platzi
- Interfaz responsive y accesible
- Animaciones suaves y microinteracciones

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/DanbenErick/front_cepre.git
cd front_cepre
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```
Editar `.env` con la URL del backend:
```env
VITE_API_URL=http://localhost:3500
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 🛠 Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| **React 18** | Biblioteca UI |
| **TypeScript** | Tipado estático |
| **Vite** | Build tool y dev server |
| **React Router** | Navegación SPA |
| **Axios** | Cliente HTTP |
| **Lucide React** | Iconografía |
| **CSS Variables** | Sistema de diseño |

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx    # Layout principal
│   │   ├── Sidebar.tsx            # Navegación lateral
│   │   └── ProtectedRoute.tsx     # Wrapper de autenticación
│   └── ui/
│       ├── Button.tsx             # Componente botón
│       ├── Card.tsx               # Componente tarjeta
│       └── Input.tsx              # Componente input
├── pages/
│   ├── Login.tsx                  # Página de login
│   └── dashboard/
│       ├── DashboardOverview.tsx  # Inicio
│       ├── BooksPage.tsx          # Biblioteca
│       ├── PracticesPage.tsx      # Prácticas
│       ├── TeachersPage.tsx       # Docentes
│       └── AttendancePage.tsx     # Asistencia
├── services/
│   └── api.ts                     # Servicios API
├── index.css                      # Sistema de diseño
└── App.tsx                        # Router principal
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores
| Variable | Color | Uso |
|----------|-------|-----|
| `--bg-primary` | `#121214` | Fondo principal |
| `--bg-secondary` | `#1E1E20` | Fondo cards |
| `--accent` | `#98CA3F` | Color principal (verde) |
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#A0A0A0` | Texto secundario |

### Tipografía
- **Fuente**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700, 800

---

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/sistema/admin/login-estudiante-cepre` | Login estudiante |
| `POST` | `/administrador/recursos/listar-recursos` | Listar libros/prácticas |
| `POST` | `/administrador/profesores/listar-profesores` | Listar docentes |
| `POST` | `/input-controls/consultar-asistencia-cepre` | Consultar asistencia |

---

## 📱 Screenshots

<div align="center">

| Login | Dashboard |
|-------|-----------|
| Autenticación con DNI | Panel principal con estadísticas |

| Docentes | Biblioteca |
|----------|------------|
| Directorio con contacto | Grid de recursos |

</div>

---

## 👨‍💻 Autor

**Danben Erick**
- GitHub: [@DanbenErick](https://github.com/DanbenErick)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ para **CEPRE UNDAC** 

</div>
