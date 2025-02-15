// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Altere para a URL da sua API

export const login = async (email: string, senha: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;
};