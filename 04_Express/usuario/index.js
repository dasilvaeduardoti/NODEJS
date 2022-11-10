const path      = require('path');
const express   = require('express');
const basePath  = path.join(__dirname, '../templates');
const router    = express.Router();

router.post('/save', (req, resposta) =>{
    //console.log(req.body);
    const nome = req.body._nome;
    const email = req.body._email;
    console.log(`O ${nome} foi cadastrado com o e-mail ${email}`);
    resposta.sendFile(`${basePath}/formulario.html`);
});

router.get('/', (requisicao, resposta) => {
    resposta.sendFile(`${basePath}/formulario.html`);
});

module.exports = router