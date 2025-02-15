const express = require('express');
const router = express.Router();
const TecnicoController = require('../controllers/TecnicosController');

// Criar um novo técnico
router.post('/tecnicos', TecnicoController.createTecnico);

// Listar todos os técnicos
router.get('/tecnicos', TecnicoController.getAllTecnicos);

// Obter técnico por ID
router.get('/tecnicos/:id', TecnicoController.getTecnicoById);

// Atualizar um técnico
router.put('/tecnicos/:id', TecnicoController.updateTecnico);

// Excluir um técnico
router.delete('/tecnicos/:id', TecnicoController.deleteTecnico);

module.exports = router;