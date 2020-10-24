const mongoose = require('mongoose');
const User = require('../models/user');

exports.users_getAll = (req, res, next) => {

    User.find({}).select({  "_id": 0, "__v":0, "password":0}).exec().then(users => {
        let newUserArray = JSON.parse(JSON.stringify(users));
        var counterId = 0;
        newUserArray.forEach(user => {
            user.id = counterId++;

        });
        
        res.status(200).json(newUserArray)
    }).catch(err =>
        res.status(500).json({ error: err }));
}

