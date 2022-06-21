const Product = require("../model/Product");
const User = require("../model/User")

exports.FindNearProductLocation = async (req, res) => {
    try {
        var AllProduct = [];
<<<<<<< HEAD
        
=======

        let array = []
>>>>>>> 70513a52145f88ef2078672b1391fb36bfa272f5
        const pincode = req.params.pincode
        const Location = await User.find({ Pincode: pincode, Role: "Vendor" });

        if (!Location) {
            res.status(400).json({ error: "Location data is not found" })
            return
        }
<<<<<<< HEAD

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
=======
        // console.log(Location , "location")
        if (Location) {
            for (let index = 0; index < Location.length; index++) {
                const productwithlocation = await Product.find({ VendorId: Location[index].id })
                productwithlocation.map((ele, ind) => {
                    AllProduct.push(ele)
                    return AllProduct
                })
            }
            console.log(AllProduct);
            res.status(200).json({ message: "Location data is found", AllProduct })
            return
        }

>>>>>>> 70513a52145f88ef2078672b1391fb36bfa272f5

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "We unable to Find data" })
    }
}