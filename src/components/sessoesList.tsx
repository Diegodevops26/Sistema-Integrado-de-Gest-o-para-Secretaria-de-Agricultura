import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSessoes, endSessao } from "../store/loginSessaoSlice";


const SessoesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sessoes, loading, error } = useAppSelector((state) => state.loginSessao);

    useEffect(() => {
        dispatch(fetchSessoes());
    }, [dispatch]);

    const handleLogout = (id_sessao: number) => {
        dispatch(endSessao(id_sessao));
    };

    return (
        <div>
            <h2>Lista de Sessões</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ul>
                {sessoes.map((sessao) => (
                    <li key={sessao.id_sessao}>
                        Usuário ID: {sessao.id_usuario} - Início:{" "}
                        {new Date(sessao.data_inicio).toLocaleString()}
                        {sessao.status ? (
                            <>
                                {" "}
                                <button onClick={() => handleLogout(sessao.id_sessao)}>
                                    Encerrar Sessão
                                </button>
                            </>
                        ) : (
                            <> - Encerrada em {sessao.data_fim ? new Date(sessao.data_fim).toLocaleString() : "N/A"}</>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessoesList;
