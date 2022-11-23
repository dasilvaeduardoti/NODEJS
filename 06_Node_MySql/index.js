const express   = require('express');               //Importando módulo express
const exphbs    = require('express-handlebars');    //Importando módulo Handlebars
const conn      = require('./db/conn');             //Conexão Pool Mysql
const app       = express();                        //Instanciando o método express()

//Configurando Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração para aceitar CSS
//app.use(express.static('public'));

//Middlewares para receber dados dos formulários
app.use(
    express.urlencoded({extended: true})
);
app.use(express.json());

//Rota de Usuário
app.get('/usuarios', (req, res) =>{

    const sql = `SELECT ??, ??, ??, ??, ?? FROM ??`;

    const array = ['id_usuario', 'nome_usuario', 'endereco_usuario', 'email_usuario', 'data_nascimento_usuario', 
                    'usuario'];

    conn.query(sql, array, (erro, usuarios) => {
        if(erro){
            console.log(erro);
            return
        }
        //console.log(usuarios);    
        res.render('usuarios', {usuarios});       
    }); 
});

//Mostrar detalhes de um usuário
app.get('/usuario/:id', (req, res) =>{
    const id = req.params.id;
    
    const sql = `select ??, ??, ??, ??, ??
                    from ??
                    where ?? = ?`;
    const array = ['id_usuario', 'nome_usuario', 'endereco_usuario', 'email_usuario', 'data_nascimento_usuario', 
                    'usuario', 
                    'id_usuario', id];
    
    conn.query(sql, array, (erro, result) => {
        if(erro){
            console.log(erro);
            return;
        }
        const usuario = result[0];
        res.render('usuario', {usuario});
    })

});

app.get('/usuario/edit/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = `select ??, ??, ??, ??, ??
                    from ??
                    where ?? = ?`;
    
    const array = ['id_usuario', 'nome_usuario', 'endereco_usuario', 'email_usuario', 'data_nascimento_usuario', 
                        'usuario', 
                        'id_usuario', id];
    
    conn.query(sql, array, (erro, result) => {
        if(erro){
            console.log(erro);
            return;
        }
        const usuario = result[0];
        res.render('usuario-edit', {usuario});
    })
})

app.get('/usuario/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM usuario WHERE ?? = ?`;

    const array = ['id_usuario', id];

    conn.query(sql, array, (erro) => {
        if(erro){
            console.log(erro);
            return;
        }
        res.redirect('/usuarios');
    })

});

app.post('/usuario/edit/save', (req, res) =>{
    //Buscando dados do formulário
    const id                = req.body.id_usuario;
    const nome              = req.body.nome;
    const endereco          = req.body.endereco;
    const email             = req.body.email;
    const dataNascimento    = req.body.dataNascimento;

    const sql = `UPDATE usuario
                    SET ?? = ?, ?? = ?, ?? = ?, ?? = ?
                    where ?? = ?`;
    
    const array = ['nome_usuario', nome,
                    'endereco_usuario', endereco,
                    'email_usuario', email,
                    'data_nascimento_usuario',dataNascimento,
                    'id_usuario', id];
    
    conn.query(sql, array, (erro) => {
        if(erro){
            console.log(erro);
            return
        }    
        res.redirect(`/usuarios`);    
    });

});

app.post('/usuario/save', (req, res) =>{
    //Buscando dados do formulário
    const nome              = req.body.nome;
    const endereco          = req.body.endereco;
    const email             = req.body.email;
    const dataNascimento    = req.body.dataNascimento; 
    
    const sql = `INSERT INTO usuario (??, ??, ??, ??) VALUES (?, ?, ?, ?)`;
    
    const array = ['nome_usuario', 'endereco_usuario', 'email_usuario', 'data_nascimento_usuario',
                    nome, endereco, email, dataNascimento];
    
    conn.query(sql, array, (erro) => {
        if(erro){
            console.log(erro);
            return
        }    
        res.redirect('/usuarios');        
    });
    
});

//Rota Principal
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("O servidor está rodando.");
});