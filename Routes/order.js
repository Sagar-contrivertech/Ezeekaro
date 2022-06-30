const express = require('express')
const router = express.Router();
const orderController = require("../Controller/orderController");
// const {isAuthenticated} = require('../middleware/Authorize')
const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")


router.post('/order/new', AuthorizeUser ,  orderController.newOrder)


module.exports = router
