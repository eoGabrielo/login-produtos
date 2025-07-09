const mongoose = require('mongoose'); // Mongoose para modelar o banco
const bcrypt = require('bcryptjs') // Bcrypt para senhas

// Esquema do usuário
const userSchema = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true, // Obrigatório
        unique: true // Não pode repetir
    },
    userPassword:{
        type: String,
        required: true
    }
});

// Esquema do produto
const ProdutosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    codigo:{
        type: String,
        required: true,
        unique: true
    },
    preco:{
        type: Number
    },
    estoque:{
        type: Number,
        required: true
    },
})


// Middleware para criptografar senha antes de salvar
userSchema.pre('save', async function (next) {
    if (this.isModified('userPassword')) {
        const salt = await bcrypt.genSalt(10);
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
        next();
    } else {
        return next();
    }
});

// Exporta os modelos
const User = mongoose.model('User', userSchema);
const Produto = mongoose.model('Produto', ProdutosSchema);

module.exports = { User, Produto };