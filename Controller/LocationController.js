const Product = require("../model/Product");
const User = require("../model/User")

exports.FindNearProductLocation = async (req, res) => {
    try {
        const pincode = req.params.pincode
        const Location = await User.find({ Pincode :  pincode , Role : "Vendor"});

        if (!Location) {
            res.status(400).json({error : "Location data is not found"})
            return
        }
        console.log(Location)
        // const finduser = await User.find()
        let AllProduct = [];
        let data;
        if (Location) {
            Location.forEach(async  (ele , ind) => {
                const productwithlocation = await Product.find({VendorId : Location[ind].id})
                console.log(productwithlocation)
                productwithlocation && productwithlocation.map(ele => {
                    // console.log(ele)
                    data = ele
                    AllProduct.push({...data})
                    console.log(AllProduct , 'All Products')
                    res.status(400).json({message : "Location data is found" , AllProduct})
                    return
                    // AllProduct.push(ele)
                })
                // console.log(data)
                // productwithlocation.map((ele) => {
                    //     let data = ele;
                    //     console.log(data)
                    // })
                })
            // console.log(data)
            return
        }


    } catch (error) {
        res.status(400).json({error : "We unable to Find data"})
    }
}