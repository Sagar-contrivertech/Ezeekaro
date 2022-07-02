const order = require("../model/order")
var _ = require('lodash');

exports.graphData = async (req, res) => {
    try {
        let dateValue = []

        // const orderId = req.params.id
        // const orderBySeller = await Order.find({ seller: orderId })
        // console.log(req.body.FromDate, req.body.Todate);

        var query = {
            // username: req.body.username,
            PurchasedDate: {
                $gte: new Date(req.body.FromDate),
                $lte: new Date(req.body.Todate)
            },
            // leave: { $exists: false }
        }
        console.log(req.body);
        console.log(query, "jkl")
        order.find(query, function (err, data) {
            if (err) {
                return res.status(500).json({message: err})
            }
            else {
                console.log(data)
                let price = []
                let resultData
                data && data.map((i) => {
                    price.push(parseInt(i.totalPrice))
                    let formattedDate = i.PurchasedDate
                    dateValue.push(formattedDate.toISOString().substring(0, 10))
                    var data = [];
                    for (var i = 0; i < price.length; i++) {
                        data.push({ label: price[i], value: dateValue[i] });
                    }
                    let result = Object.values(data.reduce((r, o) => {
                        if (r[o.value]) r[o.value].label += o.label;
                        else r[o.value] = { ...o };
                        return r;
                    }, {}));
                    // console.log(result.label,'hgvcghvdch');
                    result.label
                    resultData = result
                    // console.log( result.label,'kjij')
                })
                let array = []
                let sumData
                resultData && resultData.map((i) => {
                    // console.log(i.label, 'l')
                    // array = parseInt(i.label)
                    array.push(i.label)
                    // dataSum = sum.reduce(function (acc, val) { return acc + val; }, 0)
                    // console.log(dataSum)
                    sumData = _.sum(array)
                    console.log(array, sumData, ';jik')
                })

                return res.status(200).json({ sumData, resultData })


            }
        })
    } catch (err) {
        console.log(err)
    }
}


exports.graphBySeller = async (req, res) => {
    try {
        let dateValue = []

        // const orderId = req.params.id
        const OrderAll = await order.find()
        // console.log(req.body.FromDate, req.body.Todate);

        var query = {
            // username: req.body.username,
            user: req.params.id,
            PurchasedDate: {
                $gte: new Date(req.body.FromDate),
                $lte: new Date(req.body.Todate)
            },
            // leave: { $exists: false }
        }

        // console.log(query, "jkl")
        order.find(query, function (err, data) {
            if (err) { return res.status(300).json("Error") }
            else {
                console.log(data)
                let price = []
                let resultData
                data && data.map((i) => {
                    price.push(parseInt(i.totalPrice))
                    let formattedDate = i.PurchasedDate
                    dateValue.push(formattedDate.toISOString().substring(0, 10))
                    var data = [];
                    for (var i = 0; i < price.length; i++) {
                        data.push({ label: price[i], value: dateValue[i] });
                    }
                    let result = Object.values(data.reduce((r, o) => {
                        if (r[o.value]) r[o.value].label += o.label;
                        else r[o.value] = { ...o };
                        return r;
                    }, {}));
                    console.log(result, 'hgvcghvdch');
                    resultData = result
                })
                let array = []
                let sumData
                resultData && resultData.map((i) => {
                    // console.log(i.label, 'l')
                    // array = parseInt(i.label)
                    array.push(i.label)
                    // dataSum = sum.reduce(function (acc, val) { return acc + val; }, 0)
                    // console.log(dataSum)
                    sumData = _.sum(array)
                    console.log(array,sumData,';jik')
                })

                return res.status(200).json({ sumData,resultData })
            }
        })
    } catch (err) {
        console.log(err)
    }
}