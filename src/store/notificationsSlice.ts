import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Notification {
    id_notificacao: number;
    id_agendamento: number;
    mensagem: string;
    tipo: "info" | "alerta" | "erro";
    data_envio: string;
    lida: boolean;
}

interface NotificationsState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: false,
    error: null,
};

// Thunk para buscar notificações do backend
export const fetchNotifications = createAsyncThunk(
    "notifications/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/notificacoes");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Erro ao carregar notificações");
        }
    }
);

// Thunk para marcar uma notificação como lida
export const markAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.put(`/api/notificacoes/${id}/lida`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Erro ao marcar notificação como lida");
        }
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.notifications = state.notifications.map((notif) =>
                    notif.id_notificacao === action.payload ? { ...notif, lida: true } : notif
                );
            });
    },
});

export default notificationsSlice.reducer;
