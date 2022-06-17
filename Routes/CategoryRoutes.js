const express = require("express")
const route = express.Router()
const CategoryController = require("../Controller/CategoryController")

route.post("/AddCategory" , CategoryController.AddCategory)

module.exports = route