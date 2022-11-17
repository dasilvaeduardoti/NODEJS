const express   = require('express');               //Importando pacote/módulo Express
const exphbs    = require('express-handlebars');    //Importando pacote/módulo Handlebars
const app       = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Rota de produtos
app.get('/produtos', (req,res) => {
    const produtos = [
        {descricao: "Arroz", preco: 23.99, promocao: true},
        {descricao: "Feijão", preco: 10.99, promocao: false},
        {descricao: "Óleo", preco: 7.99, promocao: true},
        {descricao: "Açucar", preco: 17.99, promocao: false},
        {descricao: "Farinha de Trigo", preco: 8.99, promocao: true},
        {descricao: "Shampoo", preco: 10.99, promocao: false},
        {descricao: "Condicionador", preco: 11.99, promocao: true}
    ];    
    res.render('produtos', {produtos});
});

//Rota principal da aplicação
app.get('/', (req, res) => {
    const usuario = {
        nome: "Usuário 1",
        email: "usuario1@email.com.br",
        dataNascimento: "01/01/2001"
    };

    const usuarioLogado = true;

    //const array = [1,2,3,4,5,6,7];
    /*
    const produto = {
        descricao: "Arroz", 
        preco: 23.99, 
        promocao: true
    };
    */
    //const produto = produtos[0];

    res.render('home', {usu: usuario, usuarioLogado});
});

//Executar o servidor
app.listen(3000);

