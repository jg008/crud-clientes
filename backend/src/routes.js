const express = require('express');
const router = express.Router();

const validarCliente = require('./middlewares/validarCliente');
const clientes = require('./controllers/clientesController');

router.get('/clientes', clientes.listar);
router.post('/clientes', validarCliente, clientes.inserir);
router.put('/clientes/:id', validarCliente, clientes.atualizar);
router.delete('/clientes/:id', clientes.excluir);

module.exports = router;