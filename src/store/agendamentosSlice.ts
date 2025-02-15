import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Definição da interface do agendamento
interface Agendamento {
    id_agendamento: number;
    id_usuario: number;
    id_recurso: number;
    id_servico: number;
    data_agendamento: string;
    horario_inicio: string;
    horario_fim: string;
    status: 'pendente' | 'confirmado' | 'cancelado';
}

// Estado inicial
interface AgendamentosState {
    agendamentos: Agendamento[];
    loading: boolean;
    error: string | null;
}

const initialState: AgendamentosState = {
    agendamentos: [],
    loading: false,
    error: null,
};

// 🔵 Buscar todos os agendamentos
export const fetchAgendamentos = createAsyncThunk('agendamentos/fetchAgendamentos', async () => {
    const response = await api.get('/agendamentos');
    return response.data;
});

// 🟢 Adicionar um novo agendamento
export const addAgendamento = createAsyncThunk('agendamentos/addAgendamento', async (novoAgendamento: Omit<Agendamento, 'id_agendamento'>) => {
    const response = await api.post('/agendamentos', novoAgendamento);
    return response.data;
});

// 🟡 Editar um agendamento existente
export const updateAgendamento = createAsyncThunk('agendamentos/updateAgendamento', async (agendamentoAtualizado: Agendamento) => {
    await api.put(`/agendamentos/${agendamentoAtualizado.id_agendamento}`, agendamentoAtualizado);
    return agendamentoAtualizado;
});

// 🔴 Deletar um agendamento
export const deleteAgendamento = createAsyncThunk('agendamentos/deleteAgendamento', async (id: number) => {
    await api.delete(`/agendamentos/${id}`);
    return id;
});

// Criando o slice
const agendamentosSlice = createSlice({
    name: 'agendamentos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgendamentos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAgendamentos.fulfilled, (state, action: PayloadAction<Agendamento[]>) => {
                state.loading = false;
                state.agendamentos = action.payload;
            })
            .addCase(fetchAgendamentos.rejected, (state) => {
                state.loading = false;
                state.error = 'Erro ao buscar agendamentos';
            })
            .addCase(addAgendamento.fulfilled, (state, action: PayloadAction<Agendamento>) => {
                state.agendamentos.push(action.payload);
            })
            .addCase(updateAgendamento.fulfilled, (state, action: PayloadAction<Agendamento>) => {
                state.agendamentos = state.agendamentos.map((a) =>
                    a.id_agendamento === action.payload.id_agendamento ? action.payload : a
                );
            })
            .addCase(deleteAgendamento.fulfilled, (state, action: PayloadAction<number>) => {
                state.agendamentos = state.agendamentos.filter((a) => a.id_agendamento !== action.payload);
            });
    },
});

// Exportando o reducer
export default agendamentosSlice.reducer;
