const express = require('express'); //Import express
const router = express.Router(); //Import express.Routes em 'router'

const authController = require('../controllers/authController'); //Import função de registros e login de usuários.

router.post('/register', authController.register); //Envia dados p/ função register
router.post('/login', authController.login); //Envia dados p/ função login
router.get('/check', authController.check);//Rota que verifica se o token existe e ta valido.
router.post('/produtos', authController.postProduto)//Rota enviar produtos pro banco de dados
router.get('/produtosListagem', authController.getProduto)//Rota de requisição ao banco de dados
router.delete('/produtosExcluir/:id', authController.deleteProduto)//Rota para deletar produtos do banco de dados
router.patch('/produtos/:id/estoque', authController.patchProduto)
router.put('/produtos/:id', authController.putProduto) // Rota para editar produto (todos os campos)


module.exports = router;
