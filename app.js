const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const router = express.Router();

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection(config.dbConfig);

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to DB!");

    // Query to display all tables in database.
    connection.query("SHOW TABLES", (err, results) => {
        if (err) throw err;
        // console.log("Tables ==> ", results);
    });
    
});

router.get("/", (req,res) => {
   res.render('index');
})

app.use('/', router);

app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});