const express = require("express")
const route = express.Router()
const CategoryController = require("../Controller/CategoryController")

const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

route.post("/AddCategory" , AuthorizeUser , authorizeRoles('admin') , CategoryController.AddCategory)

route.post("/GetCategory" , AuthorizeUser , authorizeRoles('admin') , CategoryController.GetAllCategory)

module.exports = route