const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

// Rotas para gerenciar notificações
router.post('/notificacoes', notificacoesController.createNotificacao);
router.get('/notificacoes', notificacoesController.getAllNotificacoes);
router.get('/notificacoes/:id', notificacoesController.getNotificacaoById);
router.put('/notificacoes/:id', notificacoesController.updateNotificacao);
router.delete('/notificacoes/:id', notificacoesController.deleteNotificacao);

module.exports = router;