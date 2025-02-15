import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchDisponibilidades, addDisponibilidade, updateDisponibilidade, deleteDisponibilidade } from '../store/disponibilidadeSlice'
import DashboardLayout from "../components/DashboardLayout";

// Definição da interface para disponibilidade
interface Disponibilidade {
    id_disponibilidade: number;
    id_recurso: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    disponivel: boolean;
}

const DisponibilidadeManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { disponibilidades, loading, error } = useSelector((state: RootState) => state.disponibilidades);

    const [idRecurso, setIdRecurso] = useState('');
    const [data, setData] = useState('');
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioFim, setHorarioFim] = useState('');
    const [disponivel, setDisponivel] = useState(true);
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchDisponibilidades());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novaDisponibilidade = {
            id_recurso: Number(idRecurso),
            data,
            horario_inicio: horarioInicio,
            horario_fim: horarioFim,
            disponivel,
        };

        if (editId) {
            dispatch(updateDisponibilidade({ id_disponibilidade: editId, ...novaDisponibilidade }));
            setEditId(null);
        } else {
            dispatch(addDisponibilidade(novaDisponibilidade));
        }

        setIdRecurso('');
        setData('');
        setHorarioInicio('');
        setHorarioFim('');
        setDisponivel(true);
    };

    const handleEdit = (disponibilidade: Disponibilidade) => {
        setEditId(disponibilidade.id_disponibilidade);
        setIdRecurso(disponibilidade.id_recurso.toString());
        setData(disponibilidade.data);
        setHorarioInicio(disponibilidade.horario_inicio);
        setHorarioFim(disponibilidade.horario_fim);
        setDisponivel(disponibilidade.disponivel);
    };

    return (
        <div>
            <h1>Gerenciamento de Disponibilidade de Recursos</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="ID do Recurso"
                    value={idRecurso}
                    onChange={(e) => setIdRecurso(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Data"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
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
                <label>
                    Disponível:
                    <input
                        type="checkbox"
                        checked={disponivel}
                        onChange={(e) => setDisponivel(e.target.checked)}
                    />
                </label>
                <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <ul>
                {disponibilidades.map((d) => (
                    <li key={d.id_disponibilidade}>
                        Recurso {d.id_recurso} - {d.data} ({d.horario_inicio} - {d.horario_fim}) -{' '}
                        {d.disponivel ? 'Disponível' : 'Indisponível'}
                        <button onClick={() => handleEdit(d)}>Editar</button>
                        <button onClick={() => dispatch(deleteDisponibilidade(d.id_disponibilidade))}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisponibilidadeManagement;