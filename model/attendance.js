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
            },
            Date : {
                type : Date,
                default : Date.now()
            }
        }
    ],
    TotalHours : {
        type : String
    },
    
    
})

module.exports = mongoose.model("Attendance" , Attendance);
