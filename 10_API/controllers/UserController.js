const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = class UserController{

    //Cadastrar usuário
    static async save(req, res){
        
        const { nome, email, senha } = req.body;

        //Verifica se usuário com este e-mail já existe
        const userExist = await User.findOne({where: {email: email}});

        if(userExist){
            res.status(400).json({message: `Usuário com e-mail ${email} já esta cadastrado!`});
            return;
        }

        //Criptografar a senha
        const salt                  = await bcrypt.genSaltSync(10);
        const senhaCriptografada    = await bcrypt.hashSync(senha, salt);

        //Criar usuário
        try {
            const usuarioNovo = {nome, email, senha: senhaCriptografada};
            await User.create(usuarioNovo);
            res.status(201).json({message: "Usuário criado com sucesso!", usuarioNovo});
            return;         
        } catch (error) {
            res.status(400).json({message: "Ocorreu erro ao cadastrar usuário.", error});
            return;
        }
    }

    //Listar todos os usuários
    static async list(req, res){

        try {
            
            const users = await User.findAll();

            if(users){
                res.status(200).json({message: "Usuários encontrados!", users});
            }else{
                res.status(404).json({message: "Ainda não há usuários cadastrado no sistema!"});
            }

        } catch (error) {
            res.status(400).json({message: "Houve erro ao buscar usuários", error});
        }

    }

    //Excluir um determinado usuário
    static async destroy(req, res){

        const idUser = req.params.id;

        try {
            //Verifica se usuário existe
            const user = await User.findOne({where: {id: idUser}});

            if(!user){
                res.status(404).json({message: "Usuário não está cadastrado!"});
                return;
            }
            
            await User.destroy({where: {id: idUser}});
            res.status(200).json({message: `Usuário com id ${idUser} excluído com sucesso`});

        } catch (error) {
            res.status(400).json({message: `Erro ao excluir usuário!`, error});
        }

    }

    //Editar um determinado usuário
    static async edit(req, res){
        const {id, nome, email} = req.body;

        try {
            //Verifica se usuário existe
            const user = await User.findOne({where: {id: id}});
            if(!user){
                res.status(404).json({message: "Usuário não está cadastrado!"});
                return;
            }

            const userNovo = {nome, email};
            await User.update(userNovo, {where: {id: id}});
            res.status(200).json({message: "Dados do Usuário editados com sucesso!", userNovo});

        } catch (error) {
            res.status(400).json({message: `Erro ao editar usuário!`, error});
            return;
        }

    }

}