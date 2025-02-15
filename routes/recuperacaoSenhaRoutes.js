const express = require('express');
const router = express.Router();
const recuperacaoController = require('../controllers/recuperacaoSenhaController');

// Solicitar recuperação de senha
router.post('/recuperacao', recuperacaoController.solicitarRecuperacao);

// Validar token de recuperação
router.get('/recuperacao/:token', recuperacaoController.validarToken);

// Resetar senha
router.post('/recuperacao/:token', recuperacaoController.resetarSenha);

module.exports = router;