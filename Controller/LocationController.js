const Product = require("../model/Product");
const User = require("../model/User")
const catchasync = require("../middleware/catchasync");

exports.FindNearProductLocation = catchasync(async (req, res) => {
    try {
        var AllProduct = [];
        var AllPincodeData = [];
        var AllPincode = req.body.pincode;
        var count;

        let pincodelength = AllPincode && AllPincode.split("/");
        // const pincode = req.params.pincode
        for (let i = 0; i < pincodelength.length; i++) {
            const Location = await User.find({ Pincode: pincodelength[i], Role: "Vendor" });
            AllPincodeData.push(...Location)
        }
        console.log(AllPincodeData)
        // if (!Location) {
        if (!AllPincodeData) {
            res.status(400).json({ error: "Location data is not found" })
            return
        }

        // if (Location) {
        if (AllPincodeData) {
            // for (let index = 0; index < Location.length; index++) {
            for (let index = 0; index < AllPincodeData.length; index++) {
                console.log(AllPincodeData);
                // const productwithlocation = await Product.find({ VendorId: Location[index].id })
                const productwithlocation = await Product.find({ VendorId: AllPincodeData[index].id })
                productwithlocation.map((ele, ind) => {
                    AllProduct.push(ele)
                    return AllProduct
                })
            }

            console.log(AllProduct);
            res.status(200).json({ message: "Location data is found", count: AllProduct.length, AllProduct })
            return
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "We unable to Find data" })
    }
})

exports.findNearProductByCity = catchasync(async (req, res, next) => {
    try {
        const city = req.body.City
        console.log(city);
        let data = []
        let AllProduct = []
        const allData = await User.find({ City: city, Role: 'Vendor' })
        allData && allData.map(e => {
            return data.push(e)
        })
        if (!data) {
            res.status(400).json({ error: "Data data is not found" })
            return
        }
        if (data) {
            for (let index = 0; index < data.length; index++) {
                console.log(data, data[index].id);
                const productwithlocation = await Product.find({ VendorId: data[index].id })
                console.log(productwithlocation);
                productwithlocation.map((ele, ind) => {
                    AllProduct.push(ele)
                    return AllProduct
                })
            }
            console.log(AllProduct);
        }
        res.status(200).json({ message: "Users by city!!!", AllProduct })
    } catch (error) {

    }
})
