import React, { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch } from 'react-redux';
import { addAgricultor } from '../store/agricultoresSlice';
import { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../components/DashboardLayout";

const AgricultorForm: React.FC = () => {
    const [form, setForm] = useState({
        nome_completo: '',
        cpf: '',
        endereco: '',
        telefone: '',
        email: '',
        id_tecnico: 1, // Ajustar depois
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addAgricultor(form));
        navigate('/agricultores');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Novo Agricultor</h1>
            <form onSubmit={handleSubmit}>
                <Input name="nome_completo" placeholder="Nome Completo" value={form.nome_completo} onChange={handleChange} />
                <Input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
                <Input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
                <Input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
                <Input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                <Button text="Salvar" type="submit" />
            </form>
        </div>
    );
};

export default AgricultorForm;
