import React, { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';
import DashboardLayout from "../components/DashboardLayout";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login realizado:', { email, password });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Entrar" onClick={handleLogin} />
        </div>
    );
};

export default Login;
