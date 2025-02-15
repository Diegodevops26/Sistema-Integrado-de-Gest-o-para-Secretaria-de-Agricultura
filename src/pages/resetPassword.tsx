import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import api from '../utils/api';

const ResetPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        try {
            await api.post('/resetar-senha', { token, senha: newPassword });
            setMessage('Senha redefinida com sucesso! Redirecionando para login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setMessage('Erro ao redefinir senha. O link pode estar expirado.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Redefinir Senha</h1>
            <input
                type="password"
                placeholder="Nova Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button text="Redefinir Senha" onClick={handleResetPassword} />
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
