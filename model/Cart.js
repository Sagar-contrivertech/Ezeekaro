const mongoose = require("mongoose");

let ItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.']
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
})

const CartSchema = new mongoose.Schema(
  {
    items: [ItemSchema],
    // subQuantity: {
    //   type: Number,
    //   default: 0
    // },
    subTotal: {
      default: 0,
      type: Number
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);