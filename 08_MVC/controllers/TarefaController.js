const Tarefa = require('../models/Tarefa');

module.exports = class TarefaController {
    static criarTarefa(req, res) {
        res.render('tarefas/criar-tarefas');
    }
}