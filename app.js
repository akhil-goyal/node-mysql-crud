const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const app = express();
const router = express.Router();

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection(config.dbConfig);

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to DB!");
});

router.get("/", (req, res) => {

    const query = "SELECT * FROM products ORDER BY id ASC";

    connection.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });

});

router.get("/:id", (req, res) => {

    console.log('Product ID : ', req.params.id);

    const query = `SELECT * FROM products WHERE id = ${req.params.id}`;

    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.render("product-details", { product: result[0] });
    });

});

// router.post('/create-product', (req, res) => {

//     const query = `INSERT INTO products (name,description,initial_price,final_price) VALUES(("${req.body.name}"),("${req.body.description}"),("${req.body.initialPrice}"),("${req.body.finalPrice}"))`;

//     // Query to store data in a table.
//     connection.query(query, (err, results) => {
//         if (err) throw err;
//         res.writeHead(302, {
//             location: "/"
//         });
//         res.end();
//     });

// })

app.use('/', router);

app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});