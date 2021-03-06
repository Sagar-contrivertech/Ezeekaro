const express = require('express')
const router = express.Router();
const orderController = require("../Controller/orderController");
const OrderAssignController = require("../Controller/OrderAssignController");
// const {isAuthenticated} = require('../middleware/Authorize')
const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")
const GraphController = require('../Controller/GraphController')

router.post('/order/new', AuthorizeUser ,  orderController.newOrder)

router.get('/order/:id', AuthorizeUser, orderController.getSingleOrder)

router.get('/admin/allorder', AuthorizeUser,
    //  authorizeRoles("Vendor","admin"), 
    orderController.allOrders)

router.put('/order/update/:id', AuthorizeUser, orderController.updateStatus)

router.post('/OrderAssign', AuthorizeUser, OrderAssignController.OrderFind)

router.post('/orderbydate', GraphController.graphData)

router.post('/orderall/:id', GraphController.graphBySeller)

module.exports = router
