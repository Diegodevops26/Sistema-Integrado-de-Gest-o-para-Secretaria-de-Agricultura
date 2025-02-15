const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

// Criar um novo agendamento
router.post('/agendamentos', agendamentosController.createAgendamento);

// Listar todos os agendamentos
router.get('/agendamentos', agendamentosController.getAllAgendamentos);

// Obter um agendamento por ID
router.get('/agendamentos/:id', agendamentosController.getAgendamentoById);

// Atualizar um agendamento
router.put('/agendamentos/:id', agendamentosController.updateAgendamento);

// Deletar um agendamento
router.delete('/agendamentos/:id', agendamentosController.deleteAgendamento);

module.exports = router;