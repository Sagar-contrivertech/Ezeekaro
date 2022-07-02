const express = require("express")
const route = express.Router()

const feedBackController = require('../Controller/FeedBackController')
const { AuthorizeUser , authorizeRoles} = require("../middleware/Authorize")

// route.get("/FindProduct/:pincode" , AuthorizeUser , LocationController.FindNearProductLocation)
route.post("/addFeedback" , AuthorizeUser , feedBackController.addFeedBack)

route.get("/getFeedBack" , AuthorizeUser , feedBackController.getFeedback)

route.get("/getFeedBackbyId/:id" , AuthorizeUser , feedBackController.getFeedbackById)



module.exports = route