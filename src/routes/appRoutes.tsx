import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import Notfound from '../pages/notfound';
import ResetPassword from '../pages/resetPassword';
import UserManagement from '../pages/userManagement';
import Agricultores from '../pages/agricultores';
import AgricultorForm from '../pages/agricultorForm';
import ResourceManagement from '../pages/resourceManagement';
import ServiceManagement from '../pages/serviceManagement';
import VisitasManagement from '../pages/visitasManagement';
import DisponibilidadeManagement from '../pages/disponibilidadeManagement';
import Notifications from '../pages/Notifications';
import TechnicianManagement from '../pages/technicianManagement';
import Dashboard from "../pages/Dashboard";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='*' element={<Notfound />} />
                <Route path='/ResetPassword' element={<ResetPassword />} />
                <Route path='/UserMaganement' element={<UserManagement />} />
                <Route path="/agricultores" element={<Agricultores />} />
                <Route path="/agricultores/novo" element={<AgricultorForm />} />
                <Route path="/recursos" element={<ResourceManagement />} />
                <Route path="/servicos" element={<ServiceManagement />} />
                <Route path="/visitas" element={<VisitasManagement />} />
                <Route path='disponibilidade' element={<DisponibilidadeManagement />} />
                <Route path="/notificacoes" element={<Notifications />} />
                <Route path="/technicianManagement" element={<TechnicianManagement onClose={function (): void {
                    throw new Error('Function not implemented.');
                }} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
