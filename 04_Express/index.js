const path      = require('path');
const express   = require('express');
const app       = express();
const porta     = 3000; //Porta para acesso ao servidor
const basePath  = path.join(__dirname, 'templates');

app.get('/', (requisicao, resposta) => {
    resposta.sendFile(`${basePath}/index.html`);
});

app.listen(porta, () => {
    console.log("A aplicação está rodando na porta "+porta);
})