import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import db from './database';

const router = express.Router();

// Rota para solicitar recuperação de senha
router.post('/recuperacao-senha', async(req, res) => {
    const { email } = req.body;
    const usuario = await db('USUARIOS_LOGIN').where({ email }).first();

    if (!usuario) return res.status(404).json({ message: 'E-mail não encontrado.' });

    const token = uuidv4();
    const expiracao = new Date(Date.now() + 3600000); // 1 hora de validade

    await db('RECUPERACAO_SENHA').insert({
        id_usuario: usuario.id_usuario,
        token_recuperacao: token,
        expiracao,
    });

    console.log(`Link de recuperação: http://localhost:3000/resetar-senha/${token}`);
    res.json({ message: 'E-mail enviado com o link de redefinição.' });
});

// Rota para redefinir a senha
router.post('/resetar-senha', async(req, res) => {
    const { token, senha } = req.body;
    const registro = await db('RECUPERACAO_SENHA').where({ token_recuperacao: token }).first();

    if (!registro || new Date(registro.expiracao) < new Date()) {
        return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await db('USUARIOS_LOGIN').where({ id_usuario: registro.id_usuario }).update({ senha_hash: senhaHash });

    await db('RECUPERACAO_SENHA').where({ token_recuperacao: token }).update({ usada: true });

    res.json({ message: 'Senha redefinida com sucesso.' });
});

export default router;