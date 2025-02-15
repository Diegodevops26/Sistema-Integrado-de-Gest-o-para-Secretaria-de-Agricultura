import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchResources, deleteResource, addResource, updateResource } from '../store/resourcesSlice';
import DashboardLayout from "../components/DashboardLayout";

const ResourceManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resources, loading, error } = useSelector((state: RootState) => state.resources);

    const [tipoRecurso, setTipoRecurso] = useState<'trator' | 'veiculo'>('trator');
    const [descricao, setDescricao] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newResource = { tipo_recurso: tipoRecurso, descricao_recurso: descricao };

        if (editId) {
            dispatch(updateResource({ id_recurso: editId, ...newResource }));
            setEditId(null);
        } else {
            dispatch(addResource(newResource));
        }

        setTipoRecurso('trator');
        setDescricao('');
    };

    const handleEdit = (resource: { id_recurso: number; tipo_recurso: 'trator' | 'veiculo'; descricao_recurso: string }) => {
        setEditId(resource.id_recurso);
        setTipoRecurso(resource.tipo_recurso);
        setDescricao(resource.descricao_recurso);
    };

    return (
        <div>
            <h1>Gerenciamento de Recursos</h1>

            <form onSubmit={handleSubmit}>
                <select value={tipoRecurso} onChange={(e) => setTipoRecurso(e.target.value as 'trator' | 'veiculo')}>
                    <option value="trator">Trator</option>
                    <option value="veiculo">Veículo</option>
                </select>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <ul>
                {resources.map((resource) => (
                    <li key={resource.id_recurso}>
                        {resource.tipo_recurso} - {resource.descricao_recurso}
                        <button onClick={() => handleEdit(resource)}>Editar</button>
                        <button onClick={() => dispatch(deleteResource(resource.id_recurso))}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourceManagement;
