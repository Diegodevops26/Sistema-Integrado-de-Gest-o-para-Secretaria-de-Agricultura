import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchVisitas, addVisita, updateVisita, deleteVisita } from '../store/visitasSlice';
import DashboardLayout from "../components/DashboardLayout";
const VisitasManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { visitas, loading, error } = useSelector((state: RootState) => state.visitas);

    const [idAgricultor, setIdAgricultor] = useState('');
    const [idTecnico, setIdTecnico] = useState('');
    const [dataVisita, setDataVisita] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchVisitas());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novaVisita = {
            id_agricultor: Number(idAgricultor),
            id_tecnico: Number(idTecnico),
            data_visita: dataVisita,
            descricao,
        };

        if (editId) {
            dispatch(updateVisita({ id_visita: editId, ...novaVisita }));
            setEditId(null);
        } else {
            dispatch(addVisita(novaVisita));
        }

        setIdAgricultor('');
        setIdTecnico('');
        setDataVisita('');
        setDescricao('');
    };

    const handleEdit = (visita: { id_visita: number; id_agricultor: number; id_tecnico: number; data_visita: string; descricao: string }) => {
        setEditId(visita.id_visita);
        setIdAgricultor(visita.id_agricultor.toString());
        setIdTecnico(visita.id_tecnico.toString());
        setDataVisita(visita.data_visita);
        setDescricao(visita.descricao);
    };

    return (
        <div>
            <h1>Gerenciamento de Visitas Técnicas</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="ID do Agricultor"
                    value={idAgricultor}
                    onChange={(e) => setIdAgricultor(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="ID do Técnico"
                    value={idTecnico}
                    onChange={(e) => setIdTecnico(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Data da Visita"
                    value={dataVisita}
                    onChange={(e) => setDataVisita(e.target.value)}
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <ul>
                {visitas.map((visita) => (
                    <li key={visita.id_visita}>
                        {`Agricultor ID: ${visita.id_agricultor} | Técnico ID: ${visita.id_tecnico} | Data: ${visita.data_visita}`}
                        <button onClick={() => handleEdit(visita)}>Editar</button>
                        <button onClick={() => dispatch(deleteVisita(visita.id_visita))}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VisitasManagement;
