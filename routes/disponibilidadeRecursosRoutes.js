const express = require('express');
const router = express.Router();
const disponibilidadeController = require('../controllers/disponibilidadeRecursosController');

// Criar disponibilidade de recurso
router.post('/disponibilidades', disponibilidadeController.createDisponibilidade);

// Listar todas as disponibilidades
router.get('/disponibilidades', disponibilidadeController.getAllDisponibilidades);

// Obter disponibilidade por ID
router.get('/disponibilidades/:id', disponibilidadeController.getDisponibilidadeById);

// Atualizar disponibilidade
router.put('/disponibilidades/:id', disponibilidadeController.updateDisponibilidade);

// Deletar disponibilidade
router.delete('/disponibilidades/:id', disponibilidadeController.deleteDisponibilidade);

module.exports = router;