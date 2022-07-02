const mongoose = require("mongoose");

// { UserId , ClockIn , ClockOut , HalfDays , TotalHours , Remarks , IsRegularization , Date }
const Attendance = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    ClockIn : {
        type : Date,
        default : Date.now()
    },
    ClockOut : {
        type : Date,
    },
    HalfDays : {
        type : Number
    },
    TotalHours : {
        type : String,
    },
    Remarks : {
        type : String
    },
    IsRegularization : {
        type : Boolean,
        default : false
    },
    Date : {
        type : Date,
    }  
})

module.exports = mongoose.model("Attendance" , Attendance);
