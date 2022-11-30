const express           = require('express');
const router            = express.Router();
const TarefaController  = require('../controllers/TarefaController');

//Rota responsável por exibir o formulário de cadastro de tarefas
router.get('/criar', TarefaController.criarTarefa);

module.exports = router;