const order = require("../model/order");
const User = require("../model/User");
const Product = require("../model/Product");

exports.OrderFind = async (req, res, next) => {
    try {
        const orders = await order.find().populate('cart').populate('user')

        const AllPincode = [];
        const ProductsList = [];
        const VendorList = [];
        
        
        if (!orders) {
            res.status(400).json({ message: "order not found" })
            return;
        }
        // get all the product 
        for (let i = 0; i < orders.length; i++) {
            for(let j = 0; j < orders[i].cart.items.length; j++){

                let productshow = await Product.findById(orders[i].cart.items[j].productId);

                if(productshow){
                    ProductsList.push(productshow);
                }
                // console.log(ProductsList , "ProductsList")
            }  
        }

        for (let i = 0; i < ProductsList.length; i++) {
            const Vendor = await User.findById(ProductsList[i].VendorId)

            if (Vendor) {
                VendorList.push(Vendor);
            }
            
        }

        // for storing all pincode at one place
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
            res.status(200).json({ message: "Order found With Vendor Pincode", VendorList, ProductsList , DeliveryUser , orders })
            return
        }




        // res.status(200).json({ message: "Order found", orders })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "something went wrong" })
    }
}