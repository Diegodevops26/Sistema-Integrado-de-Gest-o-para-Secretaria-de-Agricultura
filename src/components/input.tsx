import React from 'react';

interface InputProps {
    type?: string; // Adicionando type opcional com padrão "text"
    name: string; // Garantindo que 'name' seja exigido
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = 'text', name, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            name={name} // Adicionando a propriedade 'name'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }}
        />
    );
};

export default Input;
