import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import UserTable from '../components/userTable';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import DashboardLayout from "../components/DashboardLayout";
interface User {
    id_usuario: number;
    nome_completo: string;
    email: string;
    cpf: string;
    ultimo_login: string | null;
    status_login: boolean;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleEdit = (user: User) => {
        setCurrentUser(user);
        setEditModalOpen(true); // Abre o modal de edição
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
        setCurrentUser(null);
    };

    const handleEditSubmit = async () => {
        if (currentUser) {
            try {
                await api.put(`/usuarios/${currentUser.id_usuario}`, currentUser);
                setUsers((prev) =>
                    prev.map((user) =>
                        user.id_usuario === currentUser.id_usuario ? currentUser : user
                    )
                );
                handleModalClose();
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/usuarios/${id}`);
            setUsers((prev) => prev.filter((user) => user.id_usuario !== id));
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal de Edição */}
            <Dialog open={isEditModalOpen} onClose={handleModalClose}>
                <DialogTitle>Editar Usuário</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome Completo"
                        value={currentUser?.nome_completo || ''}
                        onChange={(e) =>
                            setCurrentUser((prev) =>
                                prev ? { ...prev, nome_completo: e.target.value } : null
                            )
                        }
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="E-mail"
                        value={currentUser?.email || ''}
                        onChange={(e) =>
                            setCurrentUser((prev) =>
                                prev ? { ...prev, email: e.target.value } : null
                            )
                        }
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        value={currentUser?.cpf || ''}
                        onChange={(e) =>
                            setCurrentUser((prev) =>
                                prev ? { ...prev, cpf: e.target.value } : null
                            )
                        }
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Cancelar</Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserManagement;
