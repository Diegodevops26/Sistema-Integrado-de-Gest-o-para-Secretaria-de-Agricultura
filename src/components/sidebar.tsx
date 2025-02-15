import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <aside style={{ width: "250px", height: "100vh", background: "#2c3e50", color: "#fff", padding: "20px" }}>
            <h2>Sistema Agro</h2>
            <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link></li>
                    <li><Link to="/agricultores" style={{ color: "#fff", textDecoration: "none" }}>Agricultores</Link></li>
                    <li><Link to="/recursos" style={{ color: "#fff", textDecoration: "none" }}>Recursos</Link></li>
                    <li><Link to="/agendamentos" style={{ color: "#fff", textDecoration: "none" }}>Agendamentos</Link></li>
                    <li><Link to="/relatorios" style={{ color: "#fff", textDecoration: "none" }}>Relatórios</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
