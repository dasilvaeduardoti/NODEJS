const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Rotas
app.get('/users', (req, res) => {
    const user = {
        nome: "Gab",
        email: "gab@gmail.com"
    }
    res.json(user);
});

app.post('/user/save', (req, res) => {
    const {nome, email} = req.body;
    //Salvar no banco....
    if(!email){
        res.status(400).json({message: "E-mail obrigatório"});
    }
    const novouser = {
        nome, email
    }
    res.status(201).json(novouser);
});

app.listen(3000);
