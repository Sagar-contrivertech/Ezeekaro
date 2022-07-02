const mongoose = require("mongoose")
const crypto = require("crypto");

const Monthlysalary = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    SalaryId : {
        type : mongoose.Schema.ObjectId,
        ref : "Salary"
    },
    Salary : {
        type : Number
    },
    AutogenerateId : {
        type : String,
        default : crypto.randomBytes(16).toString("hex")
    }
})

module.exports = mongoose.model("Monthlysalary" , Monthlysalary);