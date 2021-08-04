"use strict"
const mysql = require('mysql');

const host = 'localhost';
const user = 'root';
const password = 'nodecomplete';
const database  = 'socia-media-database';
const pool = mysql.createPool({
    host : host,
    user : user,
    password : password,
    database : database
});
module.exports = pool;