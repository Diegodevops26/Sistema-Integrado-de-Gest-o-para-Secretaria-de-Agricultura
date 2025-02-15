import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNotifications, markAsRead } from "../store/notificationsSlice";

const NotificationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notifications, loading, error } = useAppSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleMarkAsRead = (id: number) => {
        dispatch(markAsRead(id));
    };

    return (
        <div>
            <h2>Notificações</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ul>
                {notifications.map((notif) => (
                    <li key={notif.id_notificacao} style={{ background: notif.lida ? "#ddd" : "#fff" }}>
                        <strong>{notif.tipo.toUpperCase()}</strong>: {notif.mensagem}
                        <br />
                        <small>{new Date(notif.data_envio).toLocaleString()}</small>
                        {!notif.lida && (
                            <button onClick={() => handleMarkAsRead(notif.id_notificacao)}>Marcar como lida</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
