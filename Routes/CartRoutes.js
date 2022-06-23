const CartController = require("../Controller/CartController")
const express = require("express")
const route = express.Router()
const { AuthorizeUser , authorizeRoles, authorizeGrant} = require("../middleware/Authorize")

route.post("/AddItemToCart/:id" , AuthorizeUser , CartController.addCart)

module.exports = route