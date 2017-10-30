const mongoose = require('mongoose');

const Item = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  products: [Item],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
