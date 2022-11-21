const express   = require('express');               //Importando módulo express
const exphbs    = require('express-handlebars');    //Importando módulo Handlebars
const mysql     = require('mysql');                 //Importanto módulo mysql
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

    const sql = `SELECT id_usuario, 
                        nome_usuario, 
                        endereco_usuario, 
                        email_usuario, 
                        data_nascimento_usuario 
                    FROM usuario`;

    conn.query(sql, (erro, usuarios) => {
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
    
    const sql = `select id_usuario, 
                        nome_usuario, 
                        endereco_usuario, 
                        email_usuario, 
                        data_nascimento_usuario 
                    from usuario
                    where id_usuario = ${id}`;
    
    conn.query(sql, (erro, result) => {
        if(erro){
            console.log(erro);
            return;
        }
        const usuario = result[0];
        res.render('usuario', {usuario});
    })

});

app.get('/usuario/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM usuario WHERE id_usuario = ${id}`;

    conn.query(sql, (erro) => {
        if(erro){
            console.log(erro);
            return;
        }
        res.redirect('/usuarios');
    })

});

app.post('/usuario/save', (req, res) =>{
    //Buscando dados do formulário
    const nome              = req.body.nome;
    const endereco          = req.body.endereco;
    const email             = req.body.email;
    const dataNascimento    = req.body.dataNascimento; 
    
    const sql = `INSERT INTO usuario (nome_usuario, endereco_usuario, email_usuario, data_nascimento_usuario)
        VALUES ('${nome}', '${endereco}', '${email}', '${dataNascimento}')`;
    
    conn.query(sql, (erro) => {
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

//Criando conexão com Banco de Dados
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_comum'
});

//Conectando com o Banco de Dados
conn.connect((erro) => {
    if(erro){
        console.log(erro);
        return //Para a aplicação
    }
    
    console.log('Conectou no banco db_comum!');
    
    app.listen(3000, ()=>{
        console.log("O servidor está rodando.");
    });
});