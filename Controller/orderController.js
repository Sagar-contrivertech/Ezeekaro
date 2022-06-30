const Order = require('../model/order')
const cart = require('../model/Cart')
const Products = require('../model/Product')
const user = require('../model/User')
const catchasync = require("../middleware/catchasync");
const sendEmail = require('../middleware/SendMail');

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
        
        const userDetails = req.UserId._id
        
        console.log(userDetails , "userdetaile")
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
            user: req.UserId._id
        })

        console.log(order, 'orders')

        let Id
        if (order) {
            // order.product.map(async (i) => {
            //     console.log('hj', i._id, 'jkj')
            //     Id = i._id
            //     console.log(req.body.sellcounter + 1, 'hdkhkhd')

            //     // const productToUpdate = await products.findByIdAndUpdate(Id, { $inc: { sellcounter: 1 } },);

            //     // console.log('vdhyd', productToUpdate, 'jkiyth')
            // })

            res.status(200).json({ message: "order placed sucessfully", order })
            return
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went Wrong" })
    }
})

// getsingleorder for logged in user

exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('cart').populate('user')
        if (!order) {
            res.status(400).json({ message: "order not found" })
            return;
        }
        res.status(200).json({ message: "Order found", order })
    } catch (err) {
        res.status(401).json({ message: "something went wrong" })
    }
}

// get all
exports.allOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('cart').sort({ 'PurchasedDate': -1 })
        let totalPrice = 0;
        orders.forEach(Order => {
            totalPrice += Order.totalPrice
        })
        let data
        // console.log(orders, 'kk')
        // orders && orders.map((i) => {
        //     // console.log(i.cart.items, ';;l')
        //     i.cart.items && i.cart.items.map(async(j) => {
        //         console.log(j.productId, 'klj')
        //         data = j.productId
        //     })
        // })
        // const product = await products.findById(data)
        // orders.push(product)
        // // console.log(i.cart.items,'klk')
        // let orderData = []
        // orderData.push(orders)
        // console.log(orderData);
        if (orders) {
            res.status(200).json({ message: "Order fornd", orders, totalPrice })
            return;
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "order not found" })
    }
}

// update status

exports.updateStatus = async (req, res) => {
    try {
        const updateOrder = await Order.findById(req.params.id)

        const getOrder = await user.findById(updateOrder.user)
        console.log(getOrder)
        let Email = getOrder.Email
        console.log(Email)
        if (updateOrder) {
            const updateData = {
                // commsionPaid: req.body.commsionPaid,
                // shippingInfo: req.body.shippingInfo,
                orderStatus: req.body.orderStatus
            }
            // console.log(updateData);
            const ordered = await Order.findByIdAndUpdate(req.params.id, updateData, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(ordered)
            if (ordered) {
                const message = `
                your order has been ${req.body.orderStatus} with order Id ${ordered._id} 
                
                please feel to connect us`
                console.log(message)

                await sendEmail({
                    email: Email,
                    subject: "Your order Status  ",
                    message
                })
                console.log(Email, 'emal')
                // res.status(200).json({ message: "Succed", ordered })
                res.status(200).json({ mesage: "order update sucessfully", ordered })
                return;
            }
            return;
        }
    } catch (err) {
        res.status(400).json({ message: "error while sending email", err })
    }
}
