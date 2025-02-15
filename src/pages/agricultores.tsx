import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchAgricultores, deleteAgricultor } from '../store/agricultoresSlice';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../components/DashboardLayout";

const Agricultores: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { agricultores, status, error } = useSelector((state: RootState) => state.agricultores as { agricultores: any[], status: string, error: string | null });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAgricultores());
        }
    }, [status, dispatch]);

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Gerenciar Agricultores</h1>
            <Button text="Adicionar Agricultor" onClick={() => navigate('/agricultores/novo')} />

            {status === 'loading' && <p>Carregando...</p>}
            {status === 'failed' && <p>Erro: {error}</p>}

            <table border={1} width="100%" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agricultores.map((agricultor) => (
                        <tr key={agricultor.id_agricultor}>
                            <td>{agricultor.nome_completo}</td>
                            <td>{agricultor.cpf}</td>
                            <td>{agricultor.telefone || '-'}</td>
                            <td>{agricultor.email || '-'}</td>
                            <td>
                                <Button text="Editar" onClick={() => navigate(`/agricultores/editar/${agricultor.id_agricultor}`)} />
                                <Button text="Excluir" onClick={() => dispatch(deleteAgricultor(agricultor.id_agricultor))} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Agricultores;