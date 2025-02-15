const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carregar variaveis de ambiente do .env

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    const token = authHeader.split('')[1]; // Extrair o token após "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Formato do token inválido.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado.' });
            }
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.user = decoded; // Injetar os dados do usuário no objeto de requisição
        next();
    });

};