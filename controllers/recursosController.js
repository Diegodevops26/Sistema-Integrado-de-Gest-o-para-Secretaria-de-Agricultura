const Recurso = require('../models/recursos');

// Criar um novo recurso
exports.craeteRecurso = async(req, res) => {
    try {
        const recurso = await Recurso.create(req.body);
        res.status(201).json(recurso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todos os recursos
exports.getAllRecursos = async(req, res) => {
    try {
        const recursos = await Recurso.findAll();
        res.status(200).json(recursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um recurso por ID
exports.getRecursoById = async(req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.findByPk(id);

        if (!recurso) {
            return res.status(404).json({ error: 'Recurso não encontrado.' });
        }

        res.status(200).json(recurso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um recurso
exports.updateRecurso = async(req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Recurso.update(req.body, { where: { id_recurso: id } });

        if (!updated) {
            return res.status(404).json({ error: 'Recurso não encontrado.' });
        }

        const updatedRecurso = await Recurso.findByPk(id);
        res.status(200).json(updatedRecurso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um recurso
exports.deleteRecurso = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Recurso.destroy({ where: { id_recurso: id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Recurso não encontrado.' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};