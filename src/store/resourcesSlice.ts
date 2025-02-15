import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Definição da interface do recurso
interface Recurso {
    id_recurso: number;
    tipo_recurso: 'trator' | 'veiculo';
    descricao_recurso: string;
}

// Estado inicial
interface ResourcesState {
    resources: Recurso[];
    loading: boolean;
    error: string | null;
}

const initialState: ResourcesState = {
    resources: [],
    loading: false,
    error: null,
};

// Async Thunks para operações assíncronas (CRUD)

// 🔵 Buscar todos os recursos
export const fetchResources = createAsyncThunk('resources/fetchResources', async () => {
    const response = await api.get('/recursos');
    return response.data;
});

// 🟢 Adicionar um novo recurso
export const addResource = createAsyncThunk('resources/addResource', async (newResource: Omit<Recurso, 'id_recurso'>) => {
    const response = await api.post('/recursos', newResource);
    return response.data;
});

// 🟡 Editar um recurso existente
export const updateResource = createAsyncThunk('resources/updateResource', async (updatedResource: Recurso) => {
    await api.put(`/recursos/${updatedResource.id_recurso}`, updatedResource);
    return updatedResource;
});

// 🔴 Deletar um recurso
export const deleteResource = createAsyncThunk('resources/deleteResource', async (id: number) => {
    await api.delete(`/recursos/${id}`);
    return id;
});

// Criando o slice
const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchResources.fulfilled, (state, action: PayloadAction<Recurso[]>) => {
                state.loading = false;
                state.resources = action.payload;
            })
            .addCase(fetchResources.rejected, (state) => {
                state.loading = false;
                state.error = 'Erro ao buscar recursos';
            })
            .addCase(addResource.fulfilled, (state, action: PayloadAction<Recurso>) => {
                state.resources.push(action.payload);
            })
            .addCase(updateResource.fulfilled, (state, action: PayloadAction<Recurso>) => {
                state.resources = state.resources.map((r) =>
                    r.id_recurso === action.payload.id_recurso ? action.payload : r
                );
            })
            .addCase(deleteResource.fulfilled, (state, action: PayloadAction<number>) => {
                state.resources = state.resources.filter((r) => r.id_recurso !== action.payload);
            });
    },
});

// Exportando o reducer
export default resourcesSlice.reducer;
