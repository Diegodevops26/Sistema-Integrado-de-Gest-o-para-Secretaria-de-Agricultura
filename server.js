const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/usuarioRoutes');
const agricultorRoutes = require('./routes/agricultorRoutes');
const recursosRoutes = require('./routes/recursosRoutes');
const agendamentosRoutes = require('./routes/agendamentosRoutes');
const servicosRoutes = require('./routes/servicosRoutes');
const disponibilidadeRecursosRoutes = require('./routes/disponibilidadeRecursosRoutes');
const recuperacaoSenhaRoutes = require('./routes/recuperacaoSenhaRoutes');
const notificacoesRoutes = require('./routes/notificacoesRoutes');
const relatoriosRoutes = require('./routes/relatoriosRoutes');
const tecnicosRoutes = require('./routes/tecnicosRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const visitaTecnicasRoutes = require('./routes/visitaTecnicasRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Teste de conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });


// Sincronizar os modelos
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco de dados.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};

startServer();




// Rotas
app.use('/api/usuario', usuarioRoutes);
app.use('/api/agricultores', agricultorRoutes);
app.use('/api/recursos', recursosRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/disponibilidadeRecursos', disponibilidadeRecursosRoutes);
app.use('/api/recuperacaoSenha', recuperacaoSenhaRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/relatorios', relatoriosRoutes);
app.use('/api/tecnicos', tecnicosRoutes);
app.use('/api/visitatecnica', visitaTecnicasRoutes);


// Rota de teste
app.get('/', (req, res) => {
    res.send('API do SistemaAgro está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});