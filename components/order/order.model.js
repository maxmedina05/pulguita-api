const mongoose = require('mongoose');

const Item = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: {
    type: Number,
    default: 1
  }
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
