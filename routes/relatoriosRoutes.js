const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

// Criar um novo relatório
router.post('/relatorios', relatoriosController.createRelatorio);

// Listar todos os relatórios
router.get('/relatorios', relatoriosController.getAllRelatorios);

// Obter relatório por ID
router.get('/relatorios/:id', relatoriosController.getRelatorioById);

// Atualizar um relatório
router.put('/relatorios/:id', relatoriosController.updateRelatorio);

// Excluir um relatório
router.delete('/relatorios/:id', relatoriosController.deleteRelatorio);

module.exports = router;