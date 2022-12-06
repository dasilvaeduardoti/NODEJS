const express   = require('express');
const exphbs    = require('express-handlebars');
const conn      = require('./db/conn');
//Importando novos módulos
const session   = require('express-session');
const FileStore = require('session-file-store')(session);
const flash     = require('express-flash');

const app       = express();

//Configuração Template Engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração para aceitar dados de formulários
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Configuração das sessões
app.use(
    session({
        name: 'session',
        secret: 'nosso-secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now(), +360000),
            httpOnly: true
        }
    })
);

//Setar sessões para requisição
app.use((req, res, next) => {
    if(req.session.userId){
        res.locals.session = req.session
    }
    next()
});

//Configurando Flash Messagens
app.use(flash());

//Importação dos Models
const User = require('./models/User');
const Post = require('./models/Post');

//Importar as Rotas
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoutes');

app.use('/', authRoutes);
app.use('/', postRoutes);

conn.sync()
.then(
    app.listen(3000)
).catch((erro) => console.log(erro));