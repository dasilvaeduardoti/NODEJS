const express   = require('express');
const app       = express();
const porta     = 3000; //Porta para acesso ao servidor

app.get('/produtos', (requisicao, resposta) => {
    resposta.send("Esta é minha primeira página utilizando o Node.js");
});

app.listen(porta, () => {
    console.log("A aplicação está rodando na porta "+porta);
})