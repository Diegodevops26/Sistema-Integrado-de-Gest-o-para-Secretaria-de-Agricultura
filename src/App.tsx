import Notfound from './pages/notfound';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/userManagement';
import Agricultores from './pages/agricultores';
import AgricultorForm from './pages/agricultorForm';
import ResourceManagement from './pages/resourceManagement';
import ServiceManagement from './pages/serviceManagement';
import VisitasManagement from './pages/visitasManagement';
import DisponibilidadeManagement from './pages/disponibilidadeManagement';
import Notifications from './pages/Notifications';
import TechnicianManagement from './pages/technicianManagement';
import React, { JSX } from 'react';

// Componente de proteção para rotas privadas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Simulação de autenticação
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
    <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rotas Privadas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/agricultores" element={<PrivateRoute><Agricultores /></PrivateRoute>} />
        <Route path="/agricultores/novo" element={<PrivateRoute><AgricultorForm /></PrivateRoute>} />
        <Route path="/recursos" element={<PrivateRoute><ResourceManagement /></PrivateRoute>} />
        <Route path="/servicos" element={<PrivateRoute><ServiceManagement /></PrivateRoute>} />
        <Route path="/visitas" element={<PrivateRoute><VisitasManagement /></PrivateRoute>} />
        <Route path="/disponibilidade" element={<PrivateRoute><DisponibilidadeManagement /></PrivateRoute>} />
        <Route path="/notificacoes" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/technician-management" element={<PrivateRoute><TechnicianManagement onClose={function (): void {
            throw new Error('Function not implemented.');
        }} /></PrivateRoute>} />

        {/* Rota Padrão para Página Não Encontrada */}
        <Route path="*" element={<Notfound />} />
    </Routes>
);

export default AppRoutes;


