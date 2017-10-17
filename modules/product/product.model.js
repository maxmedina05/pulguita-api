const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  inStock: Number,
  price: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
