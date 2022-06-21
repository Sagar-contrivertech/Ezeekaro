const express = require("express")
const route = express.Router()
const CouponController = require("../Controller/CouponController")
const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")


route.post("/GenerateCode" , CouponController.GenerateCouponCode)

// apply coupen api
route.put("/ApplyCoupen/:id" , AuthorizeUser , CouponController.ApplyCoupenCode)

module.exports = route