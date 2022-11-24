const express   =   require('express');             //Módulo Express
const exphbs    =   require('express-handlebars');  //Módulo Handlebars
const conn      =   require('./db/conn');           //Módulo Banco de dados
const app       =   express();                      //Classe express

//Importação do módulo de Clube
const Clube = require('./models/Clube');

//Configuração da template engine (Handlebars)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração de formulários
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Rotas do Clube
app.post('/clube/save', async (req, res) =>{
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;
    }

    await Clube.create({nome, status});

    res.redirect('/clubes');

});

app.get('/clubes', (req, res) => {
    res.render('clubes');
});

app.get('/', (req, res) => {
    res.render('home');
});

conn.sync().then(() =>{
    app.listen(3000);
}).catch((erro) => {
    console.log(erro);
});