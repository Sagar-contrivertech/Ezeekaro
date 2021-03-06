const ProductController = require("../Controller/ProductController")
const express = require("express")
const route = express.Router()

const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

route.post("/AddProduct" , AuthorizeUser ,  ProductController.AddProducts)

route.get("/GetProduct",  AuthorizeUser,ProductController.GetProduct)

route.put("/UpdateProduct/:id" , AuthorizeUser , authorizeRoles("Vendor","admin") ,  ProductController.UpdateProduct)

route.delete("/DeleteProduct/:id" , AuthorizeUser , authorizeRoles("Vendor","admin") ,  ProductController.DeleteProduct)

module.exports = route