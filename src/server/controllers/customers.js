const mongoose = require('mongoose');
const Customer = require('../models/customer');

exports.customers_getAll = (req, res, next) => {
    Customer.find({}).select({ "_id": 0, "__v": 0 }).exec().then(customers => {
        // let newCustomersArray = JSON.parse(JSON.stringify(customers));
        // var counterId = 0;
        // newCustomersArray.forEach(user => {
        //     user.id = counterId++;
        // });
        res.status(200).json(customers)
    }).catch(err =>
        res.status(500).json({ error: err }));
}

exports.customers_add = (req, res, next) => {
    // make sure username is still avaiable.
    Customer.find({ firstName: req.body.firstName, lastName: req.body.lastName }).exec().then(customer => {
        if (customer.length >= 1) { // find returns an array
            return res.status(409).json({
                message: "Customer exists"
            })
        } else {
            const customer = new Customer({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                orders: req.body.orders,
                ordersTotal: req.body.ordersTotal,
            })

            customer.save().then(result => {
                const returnCustomer = {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    address: result.address,
                    city: result.city
                }
                res.status(201).json(returnCustomer);
            }).catch(err =>
                res.status(500).json({ error: err }));
        }
    })
}

exports.customers_delete = (req, res, next) => {
    Customer.remove({ id: req.params.id }).exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.customers_update = (req, res, next) => {
    Customer.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { upsert: true }).exec().then(customer => {
        if (customer) { 
            res.status(201).json(
                {
                     message: "Customer updated successfully",
                     customer: customer
             });
        } else {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}