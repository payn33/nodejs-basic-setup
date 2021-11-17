const express = require("express")
const router = express.Router();
const controller = require("../controllers/orders.controller");
const verifyToken = require('../auth.middleware')


router.post("/create_order", verifyToken, controller.createOrder)

module.exports = router