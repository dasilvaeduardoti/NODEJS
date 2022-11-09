var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DONO",
  database: "db_senai"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM ANIMAL', (erro, linhas) => {
    if (erro) throw erro;

    console.log('Animais: ', linhas, '\n\n')
})