const DisponibilidadeRecurso = require('../models/disponibilidadeRecursos');

// Criar disponibilidade de recurso
exports.createDisponibilidade = async(req, res) => {
    try {
        const disponibilidade = await DisponibilidadeRecurso.create(req.body);
        res.status(201).json(disponibilidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as disponibilidades
exports.getAllDisponibilidades = async(req, res) => {
    try {
        const disponibilidades = await DisponibilidadeRecurso.findAll();
        res.status(200).json(disponibilidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter disponibilidade por ID
exports.getDisponibilidadeById = async(req, res) => {
    try {
        const { id } = req.params;
        const disponibilidade = await DisponibilidadeRecurso.findByPk(id);

        if (!disponibilidade) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada.' });
        }

        res.status(200).json(disponibilidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar disponibilidade
exports.updateDisponibilidade = async(req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await DisponibilidadeRecurso.update(req.body, { where: { id_disponibilidade: id } });

        if (!updated) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada.' });
        }

        const updatedDisponibilidade = await DisponibilidadeRecurso.findByPk(id);
        res.status(200).json(updatedDisponibilidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar disponibilidade
exports.deleteDisponibilidade = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DisponibilidadeRecurso.destroy({ where: { id_disponibilidade: id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada.' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};