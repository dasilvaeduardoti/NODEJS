const path      = require('path');
const express   = require('express');
const app       = express();
const porta     = 3000; //Porta para acesso ao servidor
const basePath  = path.join(__dirname, 'templates');

const checarAutenticacao = function (req, res, next){
    req.authStatus = true;

    if (req.authStatus){
        console.log("Usuário logado!");
        next();
    }else{
        console.log("Usuário não está logado! Favor fazer login!");
        next();
    }
}

app.use(checarAutenticacao);

app.get('/', (requisicao, resposta) => {
    resposta.sendFile(`${basePath}/index.html`);
});

app.listen(porta, () => {
    console.log("A aplicação está rodando na porta "+porta);
})