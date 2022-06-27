const express = require("express")
const route = express.Router()

const { AuthorizeUser , authorizeRoles, authorizeGrant} = require("../middleware/Authorize")

const RoleController = require('../Controller/rolecontroller')
const UserController = require("../Controller/UserController")


route.post("/register/user" , UserController.RegisterUser)

route.post("/LoginUser" , UserController.LoginUser)

route.get("/GetUsers" , AuthorizeUser ,authorizeGrant('read'), UserController.GetAllUser)

route.get("/getUserById/:id" , AuthorizeUser ,authorizeGrant('read'), UserController.getUserDataById)

route.get("/GetUsersWithCoupon" , AuthorizeUser , UserController.GetAllUser)

route.put("/UpdateDeliveryStatus/:id" , AuthorizeUser, authorizeRoles('admin') , UserController.activateDelivery)

route.post("/LogoutUser" , AuthorizeUser , UserController.LogoutUser)

route.post("/UpdateUserProfile" , AuthorizeUser , UserController.updateUserProfile)

// route.post("/ForgotPasswordUser" , AuthorizeUser , UserController.forgotPassword)
// chnage permsionn routes 

route.put('/change/permission/:id',AuthorizeUser,authorizeRoles('admin'),RoleController.changePermission)

module.exports = route