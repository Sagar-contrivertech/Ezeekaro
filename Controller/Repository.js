const Cart = require("../model/Cart");
exports.cart = async (req, res) => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total seller commission ActualPrice basePrice discountValue "
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}