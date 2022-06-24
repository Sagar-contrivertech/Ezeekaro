const mongoose = require("mongoose")

const Product = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    CategoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    Image: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    IsFeatured: {
        type: Boolean,
    },
    Quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    IsDiscount: {
        type: Boolean,
    },
    Reviews: [{
        Name: {
            type: String,
        },
        Rating: {
            type: Number,
        },
        Comment: {
            type: String,
        }
    }],
    IsPromotion: {
        type: Boolean,
    },
    VendorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    CategoryName: {
        type: String
    },
    VendorName: {
        type: String
    },
    ExpiryDate: {
        type: Date
    },
    ManufactureDate: {
        type: Date
    }

})

module.exports = mongoose.model("Product", Product)