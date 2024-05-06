const mongoose = require('mongoose');

const ordersSchema = {
  customerName: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
};

module.exports = ordersSchema;