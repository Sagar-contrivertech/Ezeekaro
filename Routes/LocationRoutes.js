const express = require("express")
const route = express.Router()
const LocationController = require("../Controller/LocationController")

const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

route.get("/FindProduct/:pincode" , AuthorizeUser , LocationController.FindNearProductLocation)

module.exports = route