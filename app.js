const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const multer = require('multer');

const app = express();
const router = express.Router();

// Setting up the static public folder.
app.use(express.static(path.join(__dirname, "public")));

// App configuration.
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection(config.dbConfig);

// Connecting to MySQL database.
connection.connect(err => {
    if (err) throw err;
    console.log("Connected to DB!");
});

// Route to render landing page & fetch all products.
router.get("/", (req, res) => {

    const query = "SELECT * FROM products ORDER BY id ASC";

    connection.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });

});

// Route to display selected product & fetch product by ID.
router.get("/:id", (req, res) => {

    const query = `SELECT * FROM products WHERE id = ${req.params.id}`;

    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.render("product-details", { product: result[0] });
    });

});

// Delete a product.
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

// Storage configuration for image handling.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

// Add a new product.
router.post('/create-product', upload.single("image"), (req, res) => {

    console.dir(req.body);
    console.log(req.file);

    const query = `INSERT INTO products (name,description,initial_price,final_price, image) VALUES(("${req.body.name}"),("${req.body.description}"),("${req.body.initialPrice}"),("${req.body.finalPrice}"),("${req.file.filename}"))`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Update an existing product.
router.post("/update-product", (req, res) => {

    const query = `UPDATE products SET name = "${req.body.productName}", description = "${req.body.productDescription}", initial_price = "${Number(req.body.productInitialPrice)}", final_price = "${Number(req.body.productFinalPrice)}" WHERE id = "${Number(req.body.productId)}"`;

    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.writeHead(302, {
            Location: "/",
        });
        res.end();
    });
});

// Router initialization.
app.use('/', router);

// App initialization.
app.listen(config.serverPort, () => {
    console.log('Server is running on PORT : ', config.serverPort);
});