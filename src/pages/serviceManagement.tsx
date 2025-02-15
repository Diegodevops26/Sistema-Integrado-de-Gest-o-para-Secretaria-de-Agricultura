import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchServices, addService, updateService, deleteService } from '../store/servicesSlice';
import DashboardLayout from "../components/DashboardLayout";

const ServiceManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { services, loading, error } = useSelector((state: RootState) => state.services);

    const [nomeServico, setNomeServico] = useState('');
    const [descricao, setDescricao] = useState('');
    const [duracao, setDuracao] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newService = { nome_servico: nomeServico, descricao, duracao };

        if (editId) {
            dispatch(updateService({ id_servico: editId, ...newService }));
            setEditId(null);
        } else {
            dispatch(addService(newService));
        }

        setNomeServico('');
        setDescricao('');
        setDuracao('');
    };

    const handleEdit = (service: { id_servico: number; nome_servico: string; descricao: string; duracao: string }) => {
        setEditId(service.id_servico);
        setNomeServico(service.nome_servico);
        setDescricao(service.descricao);
        setDuracao(service.duracao);
    };

    return (
        <div>
            <h1>Gerenciamento de Serviços</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Serviço"
                    value={nomeServico}
                    onChange={(e) => setNomeServico(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Duração"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                />
                <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <ul>
                {services.map((service) => (
                    <li key={service.id_servico}>
                        {service.nome_servico} - {service.descricao} - {service.duracao}
                        <button onClick={() => handleEdit(service)}>Editar</button>
                        <button onClick={() => dispatch(deleteService(service.id_servico))}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceManagement;
