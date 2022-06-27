const express = require("express")
const route = express.Router()
const LocationController = require("../Controller/LocationController")

const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

// route.get("/FindProduct/:pincode" , AuthorizeUser , LocationController.FindNearProductLocation)
route.get("/FindProduct" , AuthorizeUser , LocationController.FindNearProductLocation)

route.get("/productByCity" , AuthorizeUser , LocationController.findNearProductByCity)


module.exports = route