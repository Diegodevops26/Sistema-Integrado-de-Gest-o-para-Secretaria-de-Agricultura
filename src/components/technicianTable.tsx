import React from 'react';

interface Technician {
    id_tecnico: number;
    nome_completo: string;
    cpf: string;
    telefone: string;
    email: string;
    status: boolean;
}

interface TechnicianTableProps {
    technicians: Technician[];
    onEdit: (technician: Technician) => void;
    onDelete: (id: number) => void;
}

const TechnicianTable: React.FC<TechnicianTableProps> = ({ technicians, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome Completo</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map((technician) => (
                    <tr key={technician.id_tecnico}>
                        <td>{technician.nome_completo}</td>
                        <td>{technician.cpf}</td>
                        <td>{technician.telefone}</td>
                        <td>{technician.email}</td>
                        <td>{technician.status ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <button onClick={() => onEdit(technician)}>Editar</button>
                            <button onClick={() => onDelete(technician.id_tecnico)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TechnicianTable;
