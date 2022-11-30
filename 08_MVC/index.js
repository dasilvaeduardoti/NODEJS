const express   = require('express');
const exphbs    = require('express-handlebars');
const conn      = require('./db/conn');
const app       = express();

//Configuração Template Engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Models
const Tarefa = require('./models/Tarefa');

//Importação de Rotas
const tarefasRoutes = require('./routes/tarefasRoutes');

//Configuração para aceitar dados de formulários
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Rotas da Aplicação
app.use('/tarefas', tarefasRoutes);

conn.sync()
.then(
    app.listen(3000)
).catch((erro) => console.log(erro));