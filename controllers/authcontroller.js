const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usuario');
require('dotenv').config(); // Carregar variáveis de ambiente do .env

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.senha_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.id_usuario, isAdmin: user.is_admin },
            process.env.JWT_SECRET, // Variável de ambiente para a chave secreta
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) { // Caso de erro no servidor 
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.getProfile = (req, res) => {
    try {
        const user = req.user; // Usuário injetado pelo middleware de autenticação
        res.json({
            id: user.id_usuario,
            nome_completo: user.nome_completo,
            email: user.email,
            ultimo_login: user.ultimo_login,
            isAdmin: user.is_admin
        });
    } catch (error) {
        console.error('Erro ao obter o perfil:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Middleware de autenticação
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = user; // Injetando o usuário no objeto de requisição
        next();
    });
};