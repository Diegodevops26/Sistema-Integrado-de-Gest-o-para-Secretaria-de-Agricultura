const Agricultor = require('../models/agricultor');
const { validationResult } = require('express-validator');

exports.createAgricultor = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { cpf } = req.body;
        const existingAgricultor = await Agricultor.findOne({ where: { cpf } });

        if (existingAgricultor) {
            return res.status(400).json({ error: 'CPF já cadastrado.' });
        }

        const agricultor = await Agricultor.create(req.body);
        res.status(201).json(agricultor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};