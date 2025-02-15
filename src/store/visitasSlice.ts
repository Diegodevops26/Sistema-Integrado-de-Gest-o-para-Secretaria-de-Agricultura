import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Definição da interface da visita técnica
interface VisitaTecnica {
    id_visita: number;
    id_agricultor: number;
    id_tecnico: number;
    data_visita: string;
    descricao: string;
}

// Estado inicial
interface VisitasState {
    visitas: VisitaTecnica[];
    loading: boolean;
    error: string | null;
}

const initialState: VisitasState = {
    visitas: [],
    loading: false,
    error: null,
};

// 🔵 Buscar todas as visitas técnicas
export const fetchVisitas = createAsyncThunk('visitas/fetchVisitas', async () => {
    const response = await api.get('/visitas-tecnicas');
    return response.data;
});

// 🟢 Adicionar uma nova visita técnica
export const addVisita = createAsyncThunk('visitas/addVisita', async (novaVisita: Omit<VisitaTecnica, 'id_visita'>) => {
    const response = await api.post('/visitas-tecnicas', novaVisita);
    return response.data;
});

// 🟡 Editar uma visita técnica existente
export const updateVisita = createAsyncThunk('visitas/updateVisita', async (visitaAtualizada: VisitaTecnica) => {
    await api.put(`/visitas-tecnicas/${visitaAtualizada.id_visita}`, visitaAtualizada);
    return visitaAtualizada;
});

// 🔴 Deletar uma visita técnica
export const deleteVisita = createAsyncThunk('visitas/deleteVisita', async (id: number) => {
    await api.delete(`/visitas-tecnicas/${id}`);
    return id;
});

// Criando o slice
const visitasSlice = createSlice({
    name: 'visitas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisitas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVisitas.fulfilled, (state, action: PayloadAction<VisitaTecnica[]>) => {
                state.loading = false;
                state.visitas = action.payload;
            })
            .addCase(fetchVisitas.rejected, (state) => {
                state.loading = false;
                state.error = 'Erro ao buscar visitas técnicas';
            })
            .addCase(addVisita.fulfilled, (state, action: PayloadAction<VisitaTecnica>) => {
                state.visitas.push(action.payload);
            })
            .addCase(updateVisita.fulfilled, (state, action: PayloadAction<VisitaTecnica>) => {
                state.visitas = state.visitas.map((v) =>
                    v.id_visita === action.payload.id_visita ? action.payload : v
                );
            })
            .addCase(deleteVisita.fulfilled, (state, action: PayloadAction<number>) => {
                state.visitas = state.visitas.filter((v) => v.id_visita !== action.payload);
            });
    },
});

// Exportando o reducer
export default visitasSlice.reducer;
