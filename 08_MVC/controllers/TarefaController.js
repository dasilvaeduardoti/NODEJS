const Tarefa = require('../models/Tarefa');

module.exports = class TarefaController {
    static criarTarefa(req, res) {
        res.render('tarefas/criar-tarefas');
    }

    static async salvarTarefa(req, res) {
        const tarefaNova = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            status: false
        };
        await Tarefa.create(tarefaNova);
        res.redirect('/tarefas');
    }

    static async listarTarefas(req, res){

        const tarefas = await Tarefa.findAll({raw: true});
        
        res.render('tarefas/listar-tarefas', {tarefas});
    }

    static async editarTarefa(req, res){
        const id = req.params.id;
        const tarefa = await Tarefa.findOne({raw: true, where: {id, id}});
        res.render('tarefas/editar', {tarefa});
    }

    static async saveEdit(req, res){

    }

    static async concluirTarefa(req, res){
        const id = req.params.id;
        await Tarefa.update({status: true}, {where: {id:id}});
        res.redirect('/tarefas');
    }

}