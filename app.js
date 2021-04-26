const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const multer = require('multer');

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

router.post("/delete-product", (req, res) => {

    const query = `DELETE FROM products WHERE id = ${req.body.id}`;

    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.writeHead(302);
        res.end();
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.post('/create-product', upload.single("image"), (req, res) => {

    console.dir(req.body);
    console.log(req.file);

    const query = `INSERT INTO products (name,description,initial_price,final_price, image) VALUES(("${req.body.name}"),("${req.body.description}"),("${req.body.initialPrice}"),("${req.body.finalPrice}"),("${req.file.filename}"))`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.use('/', router);

app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});