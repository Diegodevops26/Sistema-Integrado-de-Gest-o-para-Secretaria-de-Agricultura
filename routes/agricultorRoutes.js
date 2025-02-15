const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const agricultorController = require('../controllers/agricultorController');

router.post(
    '/agricultores', [
        body('nome_completo').notEmpty().withMessage('O nome completo é obrigatório.'),
        body('cpf').isLength({ min: 11, max: 11 }).withMessage('CPF deve conter 11 dígitos.'),
        body('endereco').notEmpty().withMessage('O endereço é obrigatório.'),
        body('telefone').notEmpty().withMessage('O telefone é obrigatório.'),
    ],
    agricultorController.createAgricultor
);

module.exports = router;