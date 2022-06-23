const Cart = require('../model/Cart')
const Products = require('../model/Product')
const cartRepository = require('../Controller/Repository')
// const productRepository = require('../controllers/productrepo')
// const { findById } = require('../models/products')

exports.addCart = async (req, res) => {
    // const {
    //     productId
    // } = req.body;
    // console.log(req.body, 'rew')
    const quantity = Number.parseInt(req.body.quantity);
    // const quantity = req.query.quantity
    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(req.params.id);
        // console.log(productDetails.commission, 'klk')
        if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----
        if (cart) {
            //---- check if index exists ----
            const indexFound = cart.items.findIndex(item => item.productId.id == req.params.id);
            //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    // cart.subQuantity = 0
                    cart.subTotal = 0;
                } else {
                    // cart.subQuantity = cart.items.map(item => item.quantity).reduce((acc, next) => acc + next)
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                cart.items[indexFound].commission = productDetails.commission

                // cart.subQuantity = cart.items.map(item => item.quantity).reduce((acc, next) => acc + next)
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----Check if Quantity is Greater than 0 then add item to items Array ----
            else if (quantity > 0) {
                cart.items.push({
                    productId: req.params.id,
                    commission: productDetails.commission,
                    quantity: quantity,
                    price: productDetails.price,
                    seller: productDetails.seller,
                    total: parseInt(productDetails.price * quantity)
                })
                // cart.subQuantity = cart.items.map(item => item.quantity).reduce((acc, next) => acc + next)
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            // else if (quantity < 1) {

            // }
            //----if quantity of price is 0 throw the error -------
            else {
                console.log(indexFound, quantity, 'cart')
                return res.status(400).json({
                    type: "Invalid ",
                    msg: "Invalid request !product doesnt exist in cart !"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process Successful",
                data: data
            })
        }
        //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
        else {
            const cartData = {
                items: [{
                    productId: req.params.id,
                    quantity: quantity,
                    commission: productDetails.commission,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subQuantity: parseInt(productDetails.quantity * quantity),
                subTotal: parseInt(productDetails.price * quantity)
            }
            cart = await cartRepository.addItem(cartData)
            // let data = await cart.save();
            res.json(cart);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}