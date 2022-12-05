const {DataTypes}   = require('sequelize');
const db            = require('../db/conn');
const User          = require('./User');

const Post = db.define('Post', {
    titulo: {type: DataTypes.STRING, allowNull: true},
    descricao: {type: DataTypes.STRING(500), allowNull: false}
});

Post.belongsTo(User); //O post só pode ser de um usuário
User.hasMany(Post); //Um usuário tem vários posts

module.exports = Post;