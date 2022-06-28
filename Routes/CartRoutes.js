const CartController = require("../Controller/CartController")
const express = require("express")
const route = express.Router()
const { AuthorizeUser , authorizeRoles, authorizeGrant} = require("../middleware/Authorize")

route.post("/AddItemToCart/:id" , AuthorizeUser , CartController.addCart)

route.get('/getcart', AuthorizeUser, CartController.getCart)

route.put('/updateQuatity/:id',AuthorizeUser ,CartController.changeQuantity)

route.delete('/deletecart', AuthorizeUser, CartController.emptyCart)

route.delete('/deletecartbyid/:id',AuthorizeUser,CartController.deletebyId)

module.exports = route