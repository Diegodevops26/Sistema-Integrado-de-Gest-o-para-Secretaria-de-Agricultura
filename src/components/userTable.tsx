import React from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

interface User {
    id_usuario: number;
    nome_completo: string;
    email: string;
    cpf: string;
    ultimo_login: string | null;
    status_login: boolean;
}

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    });

    const columns: GridColDef[] = [
        { field: 'id_usuario', headerName: 'ID', width: 70 },
        { field: 'nome_completo', headerName: 'Nome Completo', width: 200 },
        { field: 'email', headerName: 'E-mail', width: 200 },
        { field: 'cpf', headerName: 'CPF', width: 150 },
        { field: 'ultimo_login', headerName: 'Último Login', width: 180 },
        {
            field: 'status_login',
            headerName: 'Ativo',
            width: 100,
            renderCell: (params) => (params.value ? 'Sim' : 'Não'),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <>
                    <button onClick={() => onEdit(params.row)}>Editar</button>
                    <button onClick={() => onDelete(params.row.id_usuario)}>Excluir</button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 15]}
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default UserTable;
