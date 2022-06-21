const mongoose = require("mongoose")
const generator = require('generate-password');
// {User , Start_Date , End_Date , Status , Code}
const Coupon = mongoose.Schema({
    Start_Date : {
        type : String,
        required : true
    },
    End_Date : {
        type : String,
        required : true
    },
    Status : {
        type : Boolean,
        default : false
    },
    Code : {
        type : String,
        default : generator.generate({
            length: 10,
            numbers: true
        })
    }
})

module.exports = mongoose.model('Coupon', Coupon)