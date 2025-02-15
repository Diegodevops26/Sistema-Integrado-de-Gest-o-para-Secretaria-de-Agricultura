const Agendamento = require('../models/agendamentos');

// Criar um novo agendamento

exports.createAgendamento = async(req, res) => {
    try {
        const agendamento = await Agendamento.create(req.body);
        res.status(201).json(agendamento);

    } catch {
        res.status(500).json({ error: error.message });
    }
};
// Listar todos os agendamentos
exports.getAllAgendamentos = async(req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um agendamento por ID
exports.getAgendamentoById = async(req, res) => {
    try {
        const { id } = req.params;
        const agendamento = await Agendamento.findByPk(id);

        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um agendamento
exports.updateAgendamento = async(req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Agendamento.update(req.body, { where: { id_agendamento: id } });

        if (!updated) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        const updatedAgendamento = await Agendamento.findByPk(id);
        res.status(200).json(updatedAgendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um agendamento
exports.deleteAgendamento = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Agendamento.destroy({ where: { id_agendamento: id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};