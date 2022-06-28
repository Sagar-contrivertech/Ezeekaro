const express = require('express')
const router = express.Router();
const orderController = require("../Controller/orderController");
const { AuthorizeUser, authorizeRoles, authorizeGrant } = require("../middleware/Authorize")

router.post('/order/new', AuthorizeUser, orderController.newOrder)

router.get('/order/:id', AuthorizeUser, orderController.getSingleOrder)

router.get('/admin/allorder', AuthorizeUser,
    //  authorizeRoles("Vendor","admin"), 
    orderController.allOrders)

router.put('/order/update/:id', AuthorizeUser, orderController.updateStatus)

module.exports = router
