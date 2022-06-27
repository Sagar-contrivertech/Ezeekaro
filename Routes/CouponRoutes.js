const express = require("express")
const route = express.Router()
const CouponController = require("../Controller/CouponController")
const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")


route.post("/GenerateCode" ,AuthorizeUser, CouponController.GenerateCouponCode)


route.post("/generateCouponById/:id" ,AuthorizeUser, CouponController.generateCouponById)

// apply coupen api
route.put("/ApplyCoupen/:id" , AuthorizeUser , CouponController.ApplyCoupenCode)

module.exports = route