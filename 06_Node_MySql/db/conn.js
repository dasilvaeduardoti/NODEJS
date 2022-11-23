const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_comum'
});

module.exports = conn;