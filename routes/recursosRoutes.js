const express = require('express');
const router = express.Router();
const recursosController = require('../controllers/recursosController');

// Criar um novo recurso
router.post('/recursos', recursosController.craeteRecurso);

// Listar todos os recursos

router.get('/recursos', recursosController.getAllRecursos);

// Obter um recurso pelo ID

router.get('/recursos/:id', recursosController.getRecursoById);

// Atualizar um recurso

router.put('recursos/:id', recursosController.updateRecurso);

// Deletar um recurso

router.delete('/recursos/:id', recursosController.deleteRecurso);

module.exports = router;