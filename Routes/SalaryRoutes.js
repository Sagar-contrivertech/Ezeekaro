const SalaryController = require("../Controller/SalaryController")
const express = require("express")
const route = express.Router()

const { AuthorizeUser, authorizeRoles, authorizeGrant } = require("../middleware/Authorize")

route.post("/AddSalary" , AuthorizeUser , SalaryController.AddSalary)

// route.post("/CalculateSalary/:id/:days" , AuthorizeUser , SalaryController.calculatesalary)
route.post("/CalculateSalary/:id/:days" , SalaryController.calculatesalary)

route.get("/GetSalary" , AuthorizeUser , SalaryController.GetSalary)

route.get("/GetSalaryById/:id" , AuthorizeUser , SalaryController.GetSalaryById)

route.get("/GetSalaryMonthly/:id" , AuthorizeUser , SalaryController.GetAllMonthlySalary)

route.put("/UpdateSalaryById/:id" , AuthorizeUser , SalaryController.UpdateSalary)

route.delete("/DeleteSalaryById/:id" , AuthorizeUser , SalaryController.DeleteSalary)

module.exports = route