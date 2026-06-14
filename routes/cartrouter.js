const express = require("express");
const cartrouter = express.Router();

const cartController = require("../controllers/cartcontroller");

cartrouter.post("/cart/add/:id", cartController.addToCart);
cartrouter.get("/cart", cartController.getCart);

cartrouter.post("/cart/increase/:id", cartController.increaseQuantity);
cartrouter.post("/cart/decrease/:id", cartController.decreaseQuantity);
cartrouter.post("/cart/remove/:id", cartController.removeItem);
cartrouter.get("/checkout", cartController.checkout);


module.exports = cartrouter;