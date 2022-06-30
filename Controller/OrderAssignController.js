const order = require("../model/order");
const User = require("../model/User");

exports.OrderFind = async (req, res, next) => {
    try {
        const orders = await order.find().populate('cart').populate('user')

        const AllPincode = [];

        if (!orders) {
            res.status(400).json({ message: "order not found" })
            return;
        }

        for(let i = 0; i < orders.length; i++){
            AllPincode.push(orders[i].shippingInfo.postalCode); 
        }

        console.log(AllPincode );
        const FindUserWithPincode = await User.find({Pincode : { $in: AllPincode }});

        if (FindUserWithPincode) {
            const DeliveryUser = FindUserWithPincode.filter((ele) => {
                if (ele.Role === "Delivery") {
                    return ele
                }
            })
            res.status(200).json({ message: "Order found With Vendor Pincode", DeliveryUser })
            return
        }
        // res.status(200).json({ message: "Order found", orders })
    } catch (err) {
        res.status(401).json({ message: "something went wrong" })
    }
}