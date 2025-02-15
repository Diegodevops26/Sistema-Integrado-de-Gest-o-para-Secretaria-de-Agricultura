import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Definição da interface do serviço
interface Servico {
    id_servico: number;
    nome_servico: string;
    descricao: string;
    duracao: string; // formato HH:MM:SS
}

// Estado inicial
interface ServicesState {
    services: Servico[];
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    services: [],
    loading: false,
    error: null,
};

// 🔵 Buscar todos os serviços
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await api.get('/servicos');
    return response.data;
});

// 🟢 Adicionar um novo serviço
export const addService = createAsyncThunk('services/addService', async (newService: Omit<Servico, 'id_servico'>) => {
    const response = await api.post('/servicos', newService);
    return response.data;
});

// 🟡 Editar um serviço existente
export const updateService = createAsyncThunk('services/updateService', async (updatedService: Servico) => {
    await api.put(`/servicos/${updatedService.id_servico}`, updatedService);
    return updatedService;
});

// 🔴 Deletar um serviço
export const deleteService = createAsyncThunk('services/deleteService', async (id: number) => {
    await api.delete(`/servicos/${id}`);
    return id;
});

// Criando o slice
const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Servico[]>) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state) => {
                state.loading = false;
                state.error = 'Erro ao buscar serviços';
            })
            .addCase(addService.fulfilled, (state, action: PayloadAction<Servico>) => {
                state.services.push(action.payload);
            })
            .addCase(updateService.fulfilled, (state, action: PayloadAction<Servico>) => {
                state.services = state.services.map((s) =>
                    s.id_servico === action.payload.id_servico ? action.payload : s
                );
            })
            .addCase(deleteService.fulfilled, (state, action: PayloadAction<number>) => {
                state.services = state.services.filter((s) => s.id_servico !== action.payload);
            });
    },
});

// Exportando o reducer
export default servicesSlice.reducer;
