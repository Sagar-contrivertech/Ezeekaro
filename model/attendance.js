const mongoose = require("mongoose");

const Attendance = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    ClockIn : {
        type : String
    },
    ClockOut : {
        type : String
    },
    TotalHours : {
        type : String
    }
})

module.exports = mongoose.model("Attendance" , Attendance);
