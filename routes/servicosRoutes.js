const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicosController');

// Criar um novo serviço
router.post('/servicos', servicosController.createServico);

// Listar todos os serviços
router.get('/servicos', servicosController.getAllServicos);

// Obter um serviço por ID
router.get('/servicos/:id', servicosController.getServicoById);

// Atualizar um serviço
router.put('/servicos/:id', servicosController.updateServico);

// Deletar um serviço
router.delete('/servicos/:id', servicosController.deleteServico);

module.exports = router;