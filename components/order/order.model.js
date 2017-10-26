const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{id: Number, cant: Number}],
  totalPrice: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
