const express = require("express");
const orderrouter = express.Router();

const orderController = require("../controllers/ordercontroller");

orderrouter.get("/orders", orderController.getOrders);
orderrouter.post("/orders/cancel/:id", orderController.cancelOrder);
module.exports = orderrouter;