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

router.get("/", (req, res) => {

    const query = "SELECT * FROM products ORDER BY id ASC";

    // Query to fetch all data from a table in ascending order.
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });

});

router.get("/product", (req, res) => {
    res.render('product-details');
});

router.post('/create-product', (req, res) => {

    const query = `INSERT INTO products (name,description,initial_price,final_price) VALUES(("${req.body.name}"),("${req.body.description}"),("${req.body.initialPrice}"),("${req.body.finalPrice}"))`;

    // Query to store data in a table.
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.writeHead(302, {
            location: "/"
        });
        res.end();
    });

})

app.use('/', router);

app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});