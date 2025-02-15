import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addRelatorio } from "../store/relatoriosSlice";

const RelatorioForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [tipo, setTipo] = useState<"mensal" | "semanal">("mensal");
    const [descricao, setDescricao] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addRelatorio({ tipo, descricao, data_geracao: new Date().toISOString() }));
        setDescricao("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Novo Relatório</h2>
            <label>
                Tipo:
                <select value={tipo} onChange={(e) => setTipo(e.target.value as "mensal" | "semanal")}>
                    <option value="mensal">Mensal</option>
                    <option value="semanal">Semanal</option>
                </select>
            </label>
            <br />
            <label>
                Descrição:
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </label>
            <br />
            <button type="submit">Adicionar Relatório</button>
        </form>
    );
};

export default RelatorioForm;
