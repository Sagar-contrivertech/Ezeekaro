const express = require('express')
const router = express.Router();
const orderController = require("../Controller/orderController");
// const {isAuthenticated} = require('../middleware/Authorize')

router.post('/order/new', orderController.newOrder)


module.exports = router
