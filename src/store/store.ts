import { configureStore } from '@reduxjs/toolkit';
import agricultoresReducer from './agricultoresSlice'; // Ajuste o caminho conforme necessário
import technicianReducer from "./technicianSlice";
import resourcesReducer from './resourcesSlice';
import servicesReducer from './servicesSlice';
import visitasReducer from './visitasSlice';
import agendamentosReducer from './agendamentosSlice';
import disponibilidadeReducer from './disponibilidadeSlice';
import notificationsReducer from "./notificationsSlice";


export const store = configureStore({
    reducer: {
        agricultores: agricultoresReducer,
        tecnico: technicianReducer,
        resources: resourcesReducer,
        services: servicesReducer,
        visitas: visitasReducer,
        agendamentos: agendamentosReducer,
        disponibilidades: disponibilidadeReducer,
        notifications: notificationsReducer,

    },
});

// Tipos auxiliares para Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;