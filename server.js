const express = require('express');
const app = express();

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');

const connectDB = require('./mongodb/db');
connectDB();

const PORT = process.env.PORT || 3000;

const path = require('path');

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT);
});
