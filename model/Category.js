const mongoose = require("mongoose")

const Category = mongoose.Schema({
    Name : {
        type : String,
        required : true
    } ,
	Image : [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model("Category" , Category)