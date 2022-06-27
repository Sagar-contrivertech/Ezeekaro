const Order = require('../model/order')
const cart = require('../model/Cart')
const Products = require('../model/Product')
const user = require('../model/User')
const catchasync = require("../middleware/catchasync");

exports.newOrder = catchasync(async (req, res) => {
    try {
        const {
            cart,
            shippingInfo,
            totalPrice,
            ShippingPrice,
            taxPrice,
            itemPrices,
            paymentInfo,
            product,
            // PurchasedDate,
            seller,
            payType
        } = req.body
        console.log(req.body.Cart)

        const userDetails = req.user._id

        console.log(userDetails)
        const order = await Order.create({
            cart,
            shippingInfo,
            totalPrice,
            ShippingPrice,
            taxPrice,
            itemPrices,
            paymentInfo,
            product,
            seller,
            payType,
            paidAt: Date.now(),
            PurchasedDate: Date.now(),
            user: req.user._id
        })
        console.log(order, 'orders')

        let Id
        if (order) {
            order.product.map(async (i) => {
                console.log('hj', i._id, 'jkj')
                Id = i._id
                console.log(req.body.sellcounter + 1, 'hdkhkhd')

                const productToUpdate = await products.findByIdAndUpdate(Id, { $inc: { sellcounter: 1 } },);

                console.log('vdhyd', productToUpdate, 'jkiyth')
            })

            res.status(200).json({ message: "order placed sucessfully", order })
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went Wrong" })
    }
})
