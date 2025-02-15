const express = require('express');
const router = express.Router();
const visitaTecnicasController = require('../controllers/visitaTecnicasController');


// Criar uma nova visita técnica
router.post('/visitatecnica', visitaTecnicasController.createVisitaTecnica);

// Listar todas as visitas técnicas
router.get('/visitatecnica', visitaTecnicasController.getAllVisitasTecnicas);

// Obter visita técnica por ID
router.get('/visitatecnica/:id', visitaTecnicasController.getVisitaTecnicaById);

// Atualizar uma visita técnica
router.put('/visitatecnica/:id', visitaTecnicasController.updateVisitaTecnica);

// Excluir uma visita técnica
router.delete('/visitatecnica/:id', visitaTecnicasController.deleteVisitaTecnica);

module.exports = router;