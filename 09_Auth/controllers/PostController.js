const { Op } = require('sequelize');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = class PostController{

    static async showAll(req, res){
        
        let search = '';
        if(req.query.search){
            search = req.query.search
        }

        const allposts = await Post.findAll({
            include: User,
            where: {
                titulo: {[Op.like]: `%${search}%`}
            },
            order: [['id', 'DESC']]
        });
        
        const posts = allposts.map((result) => result.get({plain: true}));

        let qtdPosts = posts.length
        if (qtdPosts === 0){
            qtdPosts = false
        }

        res.render('home', {posts, search, qtdPosts})
    }

    static create(req, res){
        res.render('posts/create');
    }

    static async createSave(req, res){
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;

        const novoPost = {
            titulo: titulo,
            descricao: descricao,
            UserId: req.session.userId
        }

        try {
            await Post.create(novoPost);

            req.flash('sucesso', 'Sucesso');
            //req.flash('atencao', 'Atenção');
            req.flash('message', 'Postagem criada!');

            req.session.save(() =>{
                res.redirect('/');
            });

        } catch (error) {
            console.log(error)
        }        
    };
}