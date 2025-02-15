import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Interface do estado
interface Disponibilidade {
    id_disponibilidade: number;
    id_recurso: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    disponivel: boolean;
}

// Estado inicial
interface DisponibilidadeState {
    disponibilidades: Disponibilidade[];
    loading: boolean;
    error: string | null;
}

const initialState: DisponibilidadeState = {
    disponibilidades: [],
    loading: false,
    error: null,
};

// 🔵 Buscar todas as disponibilidades
export const fetchDisponibilidades = createAsyncThunk('disponibilidades/fetchDisponibilidades', async () => {
    const response = await api.get('/disponibilidade-recursos');
    return response.data;
});

// 🟢 Adicionar nova disponibilidade
export const addDisponibilidade = createAsyncThunk(
    'disponibilidades/addDisponibilidade',
    async (novaDisponibilidade: Omit<Disponibilidade, 'id_disponibilidade'>) => {
        const response = await api.post('/disponibilidade-recursos', novaDisponibilidade);
        return response.data;
    }
);

// 🟡 Editar uma disponibilidade existente
export const updateDisponibilidade = createAsyncThunk(
    'disponibilidades/updateDisponibilidade',
    async (disponibilidadeAtualizada: Disponibilidade) => {
        await api.put(`/disponibilidade-recursos/${disponibilidadeAtualizada.id_disponibilidade}`, disponibilidadeAtualizada);
        return disponibilidadeAtualizada;
    }
);

// 🔴 Deletar uma disponibilidade
export const deleteDisponibilidade = createAsyncThunk('disponibilidades/deleteDisponibilidade', async (id: number) => {
    await api.delete(`/disponibilidade-recursos/${id}`);
    return id;
});

// Criando o slice
const disponibilidadeSlice = createSlice({
    name: 'disponibilidades',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDisponibilidades.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDisponibilidades.fulfilled, (state, action: PayloadAction<Disponibilidade[]>) => {
                state.loading = false;
                state.disponibilidades = action.payload;
            })
            .addCase(fetchDisponibilidades.rejected, (state) => {
                state.loading = false;
                state.error = 'Erro ao buscar disponibilidades';
            })
            .addCase(addDisponibilidade.fulfilled, (state, action: PayloadAction<Disponibilidade>) => {
                state.disponibilidades.push(action.payload);
            })
            .addCase(updateDisponibilidade.fulfilled, (state, action: PayloadAction<Disponibilidade>) => {
                state.disponibilidades = state.disponibilidades.map((d) =>
                    d.id_disponibilidade === action.payload.id_disponibilidade ? action.payload : d
                );
            })
            .addCase(deleteDisponibilidade.fulfilled, (state, action: PayloadAction<number>) => {
                state.disponibilidades = state.disponibilidades.filter((d) => d.id_disponibilidade !== action.payload);
            });
    },
});

// Exportando o reducer
export default disponibilidadeSlice.reducer;
