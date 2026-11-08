const mysql = require('mysql2/promise');
require('dotenv').config();

const conexao = mysql.createPool({
    host: process.env.BD_SERVIDOR,
    user: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_BANCO,
    port: Number(process.env.BD_PORTA)
});

module.exports = conexao;