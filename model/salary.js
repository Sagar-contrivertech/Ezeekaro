const mongoose = require("mongoose");

const EmpSalary = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    Salary : {
        type : Number,
        default : "Not Defined Yet"
    }
})

module.exports = mongoose.model("Salary" , EmpSalary)

