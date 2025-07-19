const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check', authController.check);
router.post('/produtos', authController.postProduto);
router.get('/produtosListagem', authController.getProduto);
router.delete('/produtosExcluir/:id', authController.deleteProduto);
router.patch('/produtos/:id/estoque', authController.patchProduto);
router.put('/produtos/:id', authController.putProduto);

module.exports = router;
