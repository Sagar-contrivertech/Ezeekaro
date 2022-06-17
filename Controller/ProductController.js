const Product = require("../model/Product")
const cloudinary = require("cloudinary")

exports.AddProducts = async (req, res) => {
    try {
        const {Name , Description , CategoryId , Image , IsFeatured , Quantity , price , IsDiscount , Reviews , IsPromotion , VendorId} = req.body;

        let imagesLinks

        result = await cloudinary.v2.uploader.upload(Image, {
            folder: 'productimage'
        });
        
        imagesLinks = {
            public_id: result.public_id,
            url: result.secure_url
        }
        // console.log("product")
        // console.log(req.UserId)

        const products = await Product.create({
            Name : Name, Description : Description, CategoryId : CategoryId , Image : imagesLinks , IsFeatured : IsFeatured , Quantity : Quantity , price : price , IsDiscount : IsDiscount , Reviews : Reviews, IsPromotion : IsPromotion , VendorId : req.UserId._id
        })
        // console.log(products)

        if (!products) {
            res.status(400).json({error : "Cannot Add Product With This Information"})
            return
        }

        if (products) {
            await products.save()
            res.status(200).json({message : "Product Is Added" , products})
            return
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Cannot Add Product"})
    }
}

exports.GetProduct = async (req, res) => {
    try {
        const products = await Product.find()

        if (!products) {
            res.status(400).json({error : "Cannot get Product List"})
            return
        }
        
        if (products) {
            res.status(400).json({error : "get Product List" , products})
            return
        }
    } catch (error) {
        res.status(400).json({error : "Cannot get Product"})
    }
}