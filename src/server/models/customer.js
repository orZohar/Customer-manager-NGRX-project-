const mongoose = require('mongoose');

Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/myProject");

autoIncrement.initialize(connection);


const CustomerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  },
  address: { type: String },
  city: { type: String },
  orders: { type: Array },
  ordersTotal: { type: Number },
});
//CustomerSchema.plugin(autoIncrement.plugin, 'Customer');
CustomerSchema.plugin(autoIncrement.plugin, { model: 'Customer', field: 'id' });

// fullname: {
//   type: String,
// required: true
//  },

//  {
//  type: String,
// required: true,
// unique: true,
// Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
// match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],

//     hashedPassword: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     roles: [{
//       type: String,
//     }]
//   }, {
//     versionKey: false
//   });


module.exports = mongoose.model('Customer', CustomerSchema);