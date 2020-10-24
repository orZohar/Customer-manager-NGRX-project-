const mongoose = require('mongoose');
const Order = require('../models/order');
const Customer = require('../models/customer');

exports.orders_add = (req, res, next) => {
    // make sure username is still avaiable.
    Customer.find({ id: req.body.id }).exec().then(customer => {
        // push new order to customer and inc ordersTotal
        if (customer) { // find returns an array
            update = {
                $inc: {ordersTotal: req.body.itemPrice},
                $push: {orders: req.body}
            },
            // update customer orders array
            Customer.updateOne( { id: req.body.id }, update, { upsert: true }).exec().then(customer => {
            })
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                customerId: req.body.id,
                productName: req.body.productName,
                itemPrice: req.body.itemPrice,
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
            })
            order.save().then(result => {
                res.status(201).json(result);
                //     })
            }).catch(err =>
                res.status(500).json({ error: err }));
        } else {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }
    })
}

exports.orders_getAll = (req, res, next) => {
    Order.find({}).select({ "_id": 0, "__v": 0 }).exec().then(orders => {
        // let newCustomersArray = JSON.parse(JSON.stringify(customers));
        // var counterId = 0;
        // newCustomersArray.forEach(user => {
        //     user.id = counterId++;
        // });
        console.log(orders)
        res.status(200).json(orders)
    }).catch(err =>
        res.status(500).json({ error: err }));
}
