import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AttendancePage from './pages/dashboard/AttendancePage';
import BooksPage from './pages/dashboard/BooksPage';
import PracticesPage from './pages/dashboard/PracticesPage';
import TeachersPage from './pages/dashboard/TeachersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="practices" element={<PracticesPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="profile" element={<div>Perfil (Próximamente)</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
