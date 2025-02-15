import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchAgendamentos, addAgendamento, updateAgendamento, deleteAgendamento } from '../store/agendamentosSlice';
import DashboardLayout from "../components/DashboardLayout";

const AgendamentosManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { agendamentos, loading, error } = useSelector((state: RootState) => state.agendamentos);

    const [idUsuario, setIdUsuario] = useState('');
    const [idRecurso, setIdRecurso] = useState('');
    const [idServico, setIdServico] = useState('');
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioFim, setHorarioFim] = useState('');
    const [status, setStatus] = useState<'pendente' | 'confirmado' | 'cancelado'>('pendente');
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchAgendamentos());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoAgendamento = {
            id_usuario: Number(idUsuario),
            id_recurso: Number(idRecurso),
            id_servico: Number(idServico),
            data_agendamento: dataAgendamento,
            horario_inicio: horarioInicio,
            horario_fim: horarioFim,
            status,
        };

        if (editId) {
            dispatch(updateAgendamento({ id_agendamento: editId, ...novoAgendamento }));
            setEditId(null);
        } else {
            dispatch(addAgendamento(novoAgendamento));
        }

        setIdUsuario('');
        setIdRecurso('');
        setIdServico('');
        setDataAgendamento('');
        setHorarioInicio('');
        setHorarioFim('');
        setStatus('pendente');
    };

    const handleEdit = (agendamento: { id_agendamento: number; id_usuario: number; id_recurso: number; id_servico: number; data_agendamento: string; horario_inicio: string; horario_fim: string; status: 'pendente' | 'confirmado' | 'cancelado' }) => {
        setEditId(agendamento.id_agendamento);
        setIdUsuario(agendamento.id_usuario.toString());
        setIdRecurso(agendamento.id_recurso.toString());
        setIdServico(agendamento.id_servico.toString());
        setDataAgendamento(agendamento.data_agendamento);
        setHorarioInicio(agendamento.horario_inicio);
        setHorarioFim(agendamento.horario_fim);
        setStatus(agendamento.status);
    };

    return (
        <div>
            <h1>Gerenciamento de Agendamentos</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="ID do Usuário"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="ID do Recurso"
                    value={idRecurso}
                    onChange={(e) => setIdRecurso(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="ID do Serviço"
                    value={idServico}
                    onChange={(e) => setIdServico(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Data do Agendamento"
                    value={dataAgendamento}
                    onChange={(e) => setDataAgendamento(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Horário de Início"
                    value={horarioInicio}
                    onChange={(e) => setHorarioInicio(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Horário de Fim"
                    value={horarioFim}
                    onChange={(e) => setHorarioFim(e.target.value)}
                />
                <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AgendamentosManagement;
