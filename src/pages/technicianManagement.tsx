import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTechnician, updateTechnician } from '../store/technicianSlice';
import { AppDispatch } from '../store/store';
import DashboardLayout from "../components/DashboardLayout";

interface Technician {
    id_tecnico: number;
    nome_completo: string;
    cpf: string;
    telefone: string;
    email: string;
    status: boolean;
}

interface TechnicianFormProps {
    technician?: Technician | null;
    onClose: () => void;
}

const TechnicianForm: React.FC<TechnicianFormProps> = ({ technician, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<Technician>({
        id_tecnico: technician?.id_tecnico || 0,
        nome_completo: technician?.nome_completo || '',
        cpf: technician?.cpf || '',
        telefone: technician?.telefone || '',
        email: technician?.email || '',
        status: technician?.status ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        technician ? dispatch(updateTechnician(formData)) : dispatch(addTechnician(formData));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome_completo" value={formData.nome_completo} onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })} required />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default TechnicianForm;
