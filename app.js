const express = require('express');
const mysql = require('mysql');

const app = express();
const config = require('./config');

const connection = mysql.createConnection(config.dbConfig);

connection.connect(err => {
    if(err) {
        throw err;
    }
    console.log("Connected to DB!");
})

app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});