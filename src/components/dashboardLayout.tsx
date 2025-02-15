import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Header />
                <main style={{ padding: "20px" }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
