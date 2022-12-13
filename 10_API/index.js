const express   = require('express');
const conn      = require('./db/conn');
const app       = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Importando models
const User = require('./models/User');

//Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

conn.sync()
.then(
    app.listen(3000)
).catch((erro) => console.log(erro));