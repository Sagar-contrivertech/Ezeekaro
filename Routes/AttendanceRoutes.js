const AttendanceController = require("../Controller/AttendanceController");
const express = require("express");
const route = express.Router();

route.post("/AddAttendance" , AttendanceController.WorkStart)

module.exports = route