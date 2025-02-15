import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAuditoria } from "../store/auditoriaSlice";

const AuditoriaList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { auditorias, loading, error } = useAppSelector((state) => state.auditoria);

    useEffect(() => {
        dispatch(fetchAuditoria());
    }, [dispatch]);

    return (
        <div>
            <h2>Registros de Auditoria</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ul>
                {auditorias.map((log) => (
                    <li key={log.id_auditoria}>
                        <strong>Ação:</strong> {log.acao} <br />
                        <strong>Tabela:</strong> {log.tabela_afetada} <br />
                        <strong>Usuário ID:</strong> {log.id_usuario} <br />
                        <strong>Data:</strong> {new Date(log.data_acao).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuditoriaList;
