import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export interface Agricultor {
    id_agricultor: number;
    nome_completo: string;
    cpf: string;
    endereco?: string;
    telefone?: string;
    email?: string;
    id_tecnico: number;
}

interface AgricultorState {
    agricultores: Agricultor[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AgricultorState = {
    agricultores: [],
    status: 'idle',
    error: null,
};

// Thunk para buscar todos os agricultores
export const fetchAgricultores = createAsyncThunk('agricultores/fetchAgricultores', async () => {
    const response = await api.get('/agricultores');
    return response.data;
});

// Thunk adicinar um agricultor 
export const addAgricultor = createAsyncThunk('agricultores/addAgricultor', async (agricultor: Omit<Agricultor, 'id_agricultor'>) => {
    const response = await api.post('/agricultores', agricultor);
    return response.data;
});

// Thunk para excluir agricultor
export const deleteAgricultor = createAsyncThunk('agricultores/deleteAgricultor', async (id: number) => {
    await api.delete(`/agricultores/${id}`);
    return id;
});

const agricultoresSlice = createSlice({
    name: 'agricultores',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgricultores.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAgricultores.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.agricultores = action.payload;
            })
            .addCase(fetchAgricultores.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Erro desconhecido';
            })
            .addCase(addAgricultor.fulfilled, (state, action) => {
                state.agricultores.push(action.payload);
            })
            .addCase(deleteAgricultor.fulfilled, (state, action) => {
                state.agricultores = state.agricultores.filter((agricultor) => agricultor.id_agricultor !== action.payload);
            });
    },
});
export default agricultoresSlice.reducer;