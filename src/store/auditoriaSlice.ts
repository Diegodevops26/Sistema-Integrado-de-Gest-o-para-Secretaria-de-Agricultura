import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Auditoria {
    id_auditoria: number;
    id_usuario: number;
    acao: string;
    tabela_afetada: string;
    data_acao: string;
}

interface AuditoriaState {
    auditorias: Auditoria[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: AuditoriaState = {
    auditorias: [],
    loading: false,
    error: null,
};

// Thunk para buscar registros da auditoria
export const fetchAuditoria = createAsyncThunk("auditoria/fetch", async () => {
    const response = await axios.get<Auditoria[]>("/api/auditoria");
    return response.data;
});

const auditoriaSlice = createSlice({
    name: "auditoria",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuditoria.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditoria.fulfilled, (state, action: PayloadAction<Auditoria[]>) => {
                state.loading = false;
                state.auditorias = action.payload;
            })
            .addCase(fetchAuditoria.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Erro ao buscar auditoria.";
            });
    },
});

export default auditoriaSlice.reducer;
