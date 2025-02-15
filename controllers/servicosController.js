const Servico = require('../models/servico');


// Criar um novo serviço
exports.createServico = async (req, res) => {
    try {
        const { nome_servico, descricao, duracao } = req.body;

        // Validação básica
        if (!nome_servico || !duracao) {
            return res.status(400).json({ error: 'Nome e duração são obrigatórios.' });
        }

        const servico = await Servico.create({ nome_servico, descricao, duracao });
        res.status(201).json(servico);
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Listar todos os serviços
exports.getAllServicos = async (req, res) => {
    try {
        const servicos = await Servico.findAll();
        res.status(200).json(servicos);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Obter um serviço por ID
exports.getServicoById = async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await Servico.findByPk(id);

        if (!servico) {
            return res.status(404).json({ error: 'Serviço não encontrado.' });
        }

        res.status(200).json(servico);
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Atualizar um serviço
exports.updateServico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_servico, descricao, duracao } = req.body;

        const [updated] = await Servico.update({ nome_servico, descricao, duracao }, {
            where: { id_servico: id },
        });

        if (!updated) {
            return res.status(404).json({ error: 'Serviço não encontrado.' });
        }

        const updatedServico = await Servico.findByPk(id);
        res.status(200).json(updatedServico);
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Deletar um serviço
exports.deleteServico = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Servico.destroy({
            where: { id_servico: id },
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Serviço não encontrado.' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};