const Product = require("../model/Product");
const User = require("../model/User")

exports.FindNearProductLocation = async (req, res) => {
    try {
        var AllProduct = [];
        
        let array = []
        const pincode = req.params.pincode
        const Location = await User.find({ Pincode :  pincode , Role : "Vendor"});

        if (!Location) {
            res.status(400).json({error : "Location data is not found"})
            return
        }

        console.log(Location , "location")
        if (Location) {

            Location.forEach(async (ele , ind) => {

                const productwithlocation = await Product.find({VendorId : Location[ind].id})
                    
                productwithlocation.filter((ele , ind) => {
                    AllProduct.push(ele)
                    array.push(AllProduct)
                    console.log(array , "arra ins")
                })


            })

            console.log(array , "arra out")
            // console.log(newdata , "All Product ")
            res.status(200).json({message : "Location data is found" , array})
                // console.log(AllProduct , "All Product")
            return
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({error : "We unable to Find data"})
    }
}