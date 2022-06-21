const express = require("express")
const route = express.Router()

const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

const UserController = require("../Controller/UserController")

route.post("/RegisterVehicle"  , UserController.RegisterUser)

route.post("/LoginUser" , UserController.LoginUser)

route.get("/GetUsers" , AuthorizeUser , UserController.GetAllUser)

route.get("/GetUsersWithCoupon" , AuthorizeUser , UserController.GetAllUser)

route.put("/UpdateDeliveryStatus/:id" , AuthorizeUser , authorizeRoles('admin') , UserController.activateDelivery)



module.exports = route