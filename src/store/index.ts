import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationsSlice"; // Adicione seus reducers aqui
import relatoriosReducer from "./relatoriosSlice";
import loginSessaoReducer from "./loginSessaoSlice";
import auditoriaReducer from "./auditoriaSlice";

export const store = configureStore({
    reducer: {
        notifications: notificationsReducer, // Adicione mais reducers conforme necessário
        relatorios: relatoriosReducer,
        loginSessao: loginSessaoReducer,
        auditoria: auditoriaReducer,
    },
});

// Definindo os tipos RootState e AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
