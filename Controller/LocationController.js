const Product = require("../model/Product");
const User = require("../model/User")

exports.FindNearProductLocation = async (req, res) => {
    try {
        var AllProduct = [];
        
        const pincode = req.params.pincode
        const Location = await User.find({ Pincode :  pincode , Role : "Vendor"});

        if (!Location) {
            res.status(400).json({error : "Location data is not found"})
            return
        }

            if (Location) {
                for (let index = 0; index < Location.length; index++) {
                    const productwithlocation = await Product.find({ VendorId: Location[index].id })
                    productwithlocation && productwithlocation.map((ele, ind) => {
                        AllProduct.push(ele)
                        return AllProduct
                    })
                }
                // console.log(AllProduct);
                res.status(200).json({ message: "Location data is found", AllProduct })
                return
            }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "We unable to Find data"})
    }
}