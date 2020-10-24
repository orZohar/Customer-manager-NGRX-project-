const mongoose = require('mongoose');

Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/myProject");
autoIncrement.initialize(connection);

const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  customerId: Number,
  productName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  quantity: {type: Number, required: true},
  totalPrice: { type: Number },
});

OrderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'id' });

module.exports = mongoose.model('Order', OrderSchema);