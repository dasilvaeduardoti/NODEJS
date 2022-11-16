const express   = require('express');               //Importando pacote/módulo Express
const exphbs    = require('express-handlebars');    //Importando pacote/módulo Handlebars
const app       = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Rota principal da aplicação
app.get('/', (req, res) => {
    let nome = "Luiz Eduardo";
    res.render('home', {nome});
});

//Executar o servidor
app.listen(3000);

