const express = require('express')
const router = express.Router();
const orderController = require("../Controller/orderController");


router.post('/order/new', isAuthenticated, orderController.newOrder)


module.exports = router
