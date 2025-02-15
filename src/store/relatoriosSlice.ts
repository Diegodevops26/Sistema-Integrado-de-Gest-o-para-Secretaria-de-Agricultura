import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Relatorio {
    id_relatorio: number;
    tipo: "mensal" | "semanal";
    descricao: string;
    data_geracao: string;
}

interface RelatoriosState {
    relatorios: Relatorio[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: RelatoriosState = {
    relatorios: [],
    loading: false,
    error: null,
};

// Thunk para buscar relatórios
export const fetchRelatorios = createAsyncThunk("relatorios/fetchRelatorios", async () => {
    const response = await axios.get("http://localhost:3001/relatorios"); // Ajuste a URL conforme necessário
    return response.data;
});

// Thunk para adicionar um novo relatório
export const addRelatorio = createAsyncThunk(
    "relatorios/addRelatorio",
    async (novoRelatorio: Omit<Relatorio, "id_relatorio">) => {
        const response = await axios.post("http://localhost:3001/relatorios", novoRelatorio);
        return response.data;
    }
);

const relatoriosSlice = createSlice({
    name: "relatorios",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatorios.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRelatorios.fulfilled, (state, action: PayloadAction<Relatorio[]>) => {
                state.loading = false;
                state.relatorios = action.payload;
            })
            .addCase(fetchRelatorios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Erro ao buscar relatórios.";
            })
            .addCase(addRelatorio.fulfilled, (state, action: PayloadAction<Relatorio>) => {
                state.relatorios.push(action.payload);
            });
    },
});

export default relatoriosSlice.reducer;
