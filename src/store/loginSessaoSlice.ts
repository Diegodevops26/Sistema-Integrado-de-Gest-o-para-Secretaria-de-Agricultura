import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginSessao {
    id_sessao: number;
    id_usuario: number;
    data_inicio: string;
    data_fim: string | null;
    status: boolean;
}

interface SessaoState {
    sessoes: LoginSessao[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: SessaoState = {
    sessoes: [],
    loading: false,
    error: null,
};

// **Thunks para comunicação com o backend**
// Buscar todas as sessões
export const fetchSessoes = createAsyncThunk("loginSessao/fetchSessoes", async () => {
    const response = await axios.get("http://localhost:3001/sessoes");
    return response.data;
});

// Criar uma nova sessão (Login)
export const startSessao = createAsyncThunk(
    "loginSessao/startSessao",
    async (id_usuario: number) => {
        const response = await axios.post("http://localhost:3001/sessoes", { id_usuario });
        return response.data;
    }
);

// Finalizar uma sessão (Logout)
export const endSessao = createAsyncThunk(
    "loginSessao/endSessao",
    async (id_sessao: number) => {
        const response = await axios.put(`http://localhost:3001/sessoes/${id_sessao}`, {
            data_fim: new Date().toISOString(),
            status: false,
        });
        return response.data;
    }
);

const loginSessaoSlice = createSlice({
    name: "loginSessao",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessoes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSessoes.fulfilled, (state, action: PayloadAction<LoginSessao[]>) => {
                state.loading = false;
                state.sessoes = action.payload;
            })
            .addCase(fetchSessoes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Erro ao buscar sessões.";
            })
            .addCase(startSessao.fulfilled, (state, action: PayloadAction<LoginSessao>) => {
                state.sessoes.push(action.payload);
            })
            .addCase(endSessao.fulfilled, (state, action: PayloadAction<LoginSessao>) => {
                state.sessoes = state.sessoes.map((sessao) =>
                    sessao.id_sessao === action.payload.id_sessao ? action.payload : sessao
                );
            });
    },
});

export default loginSessaoSlice.reducer;
