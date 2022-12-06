const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController{

    //Exibir view para cadastrar usuário
    static register(req, res){
        res.render('auth/register');
    }

    //Exibir view para login
    static login(req, res){
        res.render('auth/login');
    }

    static async saveUser(req, res){
        //Pegar os dados do formulario
        const {nome, email, senha, senhaConfirmar } = req.body;

        //Validar senha
        if(senha != senhaConfirmar){
            res.redirect('/register');
            return
        }
        
        const userExist = await User.findOne({where: {email: email}});

        if(userExist){
            console.log('Esse usuário já existe');
            res.redirect('/register');
            return
        }

        //Criptografar a senha
        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(senha, salt);

        //Criar usuário
        try {
            const usuarioNovo = {nome, email, senha: senhaCriptografada};
            await User.create(usuarioNovo);
            res.redirect('/');            
        } catch (error) {
            console.log(error);
        }
    }

    static async loginUser(req, res){
        const {email, senha} = req.body;

        //Validar se usuário existe
        const userExist = await User.findOne({where: {email: email}});

        if(!userExist){
            console.log('Usuário não existe');
            res.redirect('/login');
            return
        }
        
        const senhaCadastrada = bcrypt.compareSync(senha, userExist.senha);

        if(!senhaCadastrada) {
            console.log('Senha errada!');
            res.redirect('/login');
            return
        }

        req.session.userId = userExist.id

        req.session.save(() => {
            console.log('Fez o login de forma correta!');
            res.redirect('/');
        })

    }

    static logout(req, res){
        if(req.session.userId){
            req.session.destroy();
            res.redirect('/');
        }
    }
}