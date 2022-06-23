const Cart = require("../../model/Cart");
const user = require('../../model/User')

// {user:req.user._id}
exports.cart = async (req, res) => {
    // console.log(req.user._id)
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total "
    });;
    return carts[0];
};

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}