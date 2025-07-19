const { User, Produto } = require('../models/Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastro de usuário
exports.register = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const existingUser = await User.findOne({userEmail});
        if(existingUser){
            return res.status(400).json({ message: 'Usuário já existe' });
        } else {
            const user = new User({ userEmail, userPassword });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(201).json({ message: 'Usuário criado com sucesso', token })
        }
    } catch(error) {
        console.error('Erro no register:', error);
        res.status(500).json({ message: 'Erro no servidor', erro: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try{
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const user = await User.findOne({userEmail})
        if(user){
            const isMatch = await bcrypt.compare(userPassword, user.userPassword)
            if(isMatch){
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                res.status(200).json({message: 'Login realizado com sucesso', token})
            } else {
                return res.status(400).json({message: 'Senha inválida'})
            }
        } else {
            return res.status(400).json({message:  'Usuário não encontrado'})
        }
    } catch(error){
        res.status(500).json({message: 'Erro servidor', error: error.message});
    }
};

// Verifica token
exports.check = async (req, res)=> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token ausente' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ valid: true, userId: decoded.id });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Token inválido ou expirado' });
    }
}

// Adiciona produto
exports.postProduto = async(req, res) =>{
    try{
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const codigo = req.body.codigo;
        const preco = req.body.preco;
        const estoque = req.body.estoque;

        const novoProduto = new Produto({
            nome,
            descricao,
            codigo,
            preco,
            estoque
        });

        const produtoSalvo = await novoProduto.save();
        res.json(produtoSalvo);
    } catch (error){
        res.send(error.message)
    }
};

// Lista produtos
exports.getProduto = async(req, res) =>{
    try{
        const produtos =  await Produto.find();
        res.json(produtos);
    } catch(error){
        res.json({
            erro: 'Erro ao buscar produtos',
            detalhes: error.message
        });
    }
}

// Deleta produto
exports.deleteProduto = async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produto.findByIdAndDelete(id);

        if (!produto) {
            return res.json({ erro: 'Produto não encontrado' });
        } else {
            res.json({ mensagem: 'Produto deletado com sucesso' });
        }
    } catch (error) {
        res.json({ erro: 'Erro ao deletar produto', detalhes: error.message });
    }
};

// Atualiza estoque
exports.patchProduto = async (req, res) =>{
    try{
        const id = req.params.id;
        const novoEstoque = Number(req.body.estoque)

        const produtoAtualizado = await Produto.findByIdAndUpdate(id,
            {estoque: novoEstoque},
            {new: true});

        if (!produtoAtualizado){
            return res.json({erro: 'Produto não encontrado'})
        } else {
            res.json(produtoAtualizado);
        }
    } catch(error){
        res.json({erro: 'Erro ao atualizar estoque', detalhes: error.message});
    }
};

// Atualiza produto completo
exports.putProduto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, descricao, codigo, preco, estoque } = req.body;

        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            { nome, descricao, codigo, preco, estoque },
            { new: true }
        );

        if (!produtoAtualizado) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        } else {
            res.json(produtoAtualizado);
        }
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar produto', detalhes: error.message });
    }
};