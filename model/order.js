const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        city: {
            type: String,
            require: true
        },
        phoneNo: {
            type: Number,
            require: true
        },
        postalCode: {
            type: Number,
            require: true
        },
        country: {
            type: String,
            require: true
        }
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    product: {
        type: Array
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        },
    },
    paidAt: {
        type: Date
    },
    productSell: {
        type: Number
    },
    taxPrice: {
        type: Number,
        // require: true,
        default: 0.0
    },
    seller: {
        type: String
    },
    ShippingPrice: {
        type: String,
        // require: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        // require: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        // require: true,
        default: "ordered",
    },
    deliveryAt: {
        type: Date,
        // require: true
    },
    PurchasedDate: {
        type: Date,
        // default: Date.now()
    },
    payType: {
        type: String,
    },
    

})
// orderSchema.plugin(AutoIncrement, { id: 'productSell_seq', inc_field: 'productSell' });
module.exports = mongoose.model('Order', orderSchema)