// src/hooks/useAuth.ts
import { createContext, useContext } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext<any>(null);

export function AuthProvider(
    {
        children
    }: { children: React.ReactNode }
) {
    async function login(email: string, senha: string) {
        const data = await loginService(email, senha);
        // Armazene o token ou dados do usuário conforme necessário
        console.log(data);
    }

    return (
        <AuthContext.Provider value= {{ login }
}>
    { children }
    </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};