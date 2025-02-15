import React from "react";
import NotificationList from "../components/NotificationList";
import DashboardLayout from "../components/DashboardLayout";

const Notifications: React.FC = () => {
    return (
        <div>
            <h1>Página de Notificações</h1>
            <NotificationList />
        </div>
    );
};

export default Notifications;
