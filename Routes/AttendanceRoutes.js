const AttendanceController = require("../Controller/AttendanceController");
const express = require("express");
const route = express.Router();

const { AuthorizeUser, authorizeRoles, authorizeGrant } = require("../middleware/Authorize")

route.post("/AddAttendance" , AuthorizeUser ,AttendanceController.WorkStart)

route.get("/GetAttendance" , AuthorizeUser , AttendanceController.GetAllTime)

route.get("/GetAttendanceById/:id" , AuthorizeUser ,  AttendanceController.GetAllTimeById)

route.put("/UpdateAttendanceById/:id" , AuthorizeUser ,  AttendanceController.UpdateTime)

route.put("/UpdateAttendanceClockoutById" , AuthorizeUser ,  AttendanceController.ClockoutUpdate)

route.delete("/DeleteAttendanceById/:id" , AuthorizeUser ,  AttendanceController.DeleteTime)

module.exports = route