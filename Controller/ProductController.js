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
        const products = await Product.find({VendorId : req.UserId._id})
        console.log(req.UserId)
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

exports.UpdateProduct = async (req, res) => {
    try {
        const {Name , Description , CategoryId , Image , IsFeatured , Quantity , price , IsDiscount , Reviews , IsPromotion , VendorId} = req.body;

        const ProductFindId = await Product.findById(req.params.id)

        if (!ProductFindId) {
            res.status(400).json({message : "Product Is Not Found With This Id"})
            return     
        }

        if (ProductFindId) {
            const UpdateProductById = await Product.findByIdAndUpdate(ProductFindId._id , {
                Name , Description , CategoryId , Image , IsFeatured , Quantity , price , IsDiscount , Reviews , IsPromotion , VendorId
            } , { new : true })

            if (!UpdateProductById) {
                res.status(400).json({error : "Product Is Not Updated "})
                return
            }
            
            if (UpdateProductById) {
                res.status(200).json({message : "Product Is Updated " , UpdateProductById})
                return
            }
        }
    } catch (error) {
        res.status(400).json({error : "Cannot Update Product"})
    }
}

exports.DeleteProduct = async (req, res) => {
    try {
        // const {Name , Description , CategoryId , Image , IsFeatured , Quantity , price , IsDiscount , Reviews , IsPromotion , VendorId} = req.body;

        const ProductFindId = await Product.findById(req.params.id)

        if (!ProductFindId) {
            res.status(400).json({message : "Product Is Not Found With This Id"})
            return     
        }

        if (ProductFindId) {
            const DeleteProductById = await Product.findByIdAndDelete(ProductFindId._id)

            if (!DeleteProductById) {
                res.status(400).json({error : "Product Is Not Deleted "})
                return
            }
            
            if (DeleteProductById) {
                res.status(200).json({message : "Product Is Deleted " , DeleteProductById})
                return
            }
            
        }
    } catch (error) {
        res.status(400).json({error : "Cannot Delete Product"})
    }
}