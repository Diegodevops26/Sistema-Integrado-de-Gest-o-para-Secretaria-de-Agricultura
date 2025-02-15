import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface Technician {
    id_tecnico: number;
    nome_completo: string;
    cpf: string;
    telefone: string;
    email: string;
    status: boolean;
}

interface TechnicianState {
    technicians: Technician[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: TechnicianState = {
    technicians: [],
    loading: false,
    error: null,
};

// Thunks para chamadas assíncronas (requisições API)
export const fetchTechnicians = createAsyncThunk("technicians/fetchTechnicians", async () => {
    const response = await api.get("/tecnicos");
    return response.data;
});

export const addTechnician = createAsyncThunk("technicians/addTechnician", async (technician: Omit<Technician, "id_tecnico">) => {
    const response = await api.post("/tecnicos", technician);
    return response.data;
});

export const updateTechnician = createAsyncThunk("technicians/updateTechnician", async (technician: Technician) => {
    await api.put(`/tecnicos/${technician.id_tecnico}`, technician);
    return technician;
});

export const deleteTechnician = createAsyncThunk("technicians/deleteTechnician", async (id: number) => {
    await api.delete(`/tecnicos/${id}`);
    return id;
});

// Slice do Redux
const technicianSlice = createSlice({
    name: "technicians",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicians.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTechnicians.fulfilled, (state, action: PayloadAction<Technician[]>) => {
                state.technicians = action.payload;
                state.loading = false;
            })
            .addCase(fetchTechnicians.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao buscar técnicos";
            })
            .addCase(addTechnician.fulfilled, (state, action: PayloadAction<Technician>) => {
                state.technicians.push(action.payload);
            })
            .addCase(updateTechnician.fulfilled, (state, action: PayloadAction<Technician>) => {
                const index = state.technicians.findIndex((tech) => tech.id_tecnico === action.payload.id_tecnico);
                if (index !== -1) {
                    state.technicians[index] = action.payload;
                }
            })
            .addCase(deleteTechnician.fulfilled, (state, action: PayloadAction<number>) => {
                state.technicians = state.technicians.filter((tech) => tech.id_tecnico !== action.payload);
            });
    },
});

export default technicianSlice.reducer;
