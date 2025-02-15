import React, { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';
import api from '../utils/api';
import DashboardLayout from "../components/DashboardLayout";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRequestReset = async () => {
        try {
            const response = await api.post('/recuperacao-senha', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao solicitar recuperação. Verifique o e-mail informado.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Recuperação de Senha</h1>
            <p>Informe seu e-mail para receber um link de redefinição.</p>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button text="Enviar" onClick={handleRequestReset} />
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
