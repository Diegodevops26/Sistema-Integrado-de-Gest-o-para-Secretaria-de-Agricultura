import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRelatorios } from "../store/relatoriosSlice";

const RelatoriosList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { relatorios, loading, error } = useAppSelector((state) => state.relatorios);

    useEffect(() => {
        dispatch(fetchRelatorios());
    }, [dispatch]);

    return (
        <div>
            <h2>Relatórios</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ul>
                {relatorios.map((relatorio) => (
                    <li key={relatorio.id_relatorio}>
                        <strong>{relatorio.tipo.toUpperCase()}</strong>: {relatorio.descricao}
                        <br />
                        <small>Gerado em: {new Date(relatorio.data_geracao).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatoriosList;
