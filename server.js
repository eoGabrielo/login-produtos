// Importa o framework Express
const express = require('express');
const app = express();

// Permite receber JSON nas requisições
app.use(express.json());

// Carrega variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');
dotenv.config();

// Importa rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Conecta ao banco de dados MongoDB
const connectDB = require('./mongodb/db');
connectDB();

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Importa módulo para lidar com caminhos de arquivos
const path = require('path');

// Rota principal: serve a página inicial personalizada
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Permite servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usa as rotas de autenticação com prefixo '/auth'
app.use('/auth', authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT);
});
