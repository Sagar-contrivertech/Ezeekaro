const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    remark:{
        type: String
    },
    behaviour: {
        type: Number,
        max: 5
    },
    satisfaction: {
        type: Number,
        max: 5
    },
    rating: {
        type: Number,
        max: 5
    }
})

module.exports = mongoose.model("FeedBack" , feedBackSchema)

