const express = require("express");
const productrouter = express.Router();

const productController = require("../controllers/productcontroller");

productrouter.get("/products", productController.getProducts);
productrouter.get("/products/:id", productController.getProductDetails);

module.exports = productrouter;