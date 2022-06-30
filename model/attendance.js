const mongoose = require("mongoose");

const Attendance = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    DailyClock : [
        {
            ClockIn : {
                type : String,
            },
            ClockOut : {
                type : String,
            }
        }
    ],
    TotalHours : {
        type : String
    },
    Date : {
        type : Date,
        default : Date.now()
    }
    
})

module.exports = mongoose.model("Attendance" , Attendance);