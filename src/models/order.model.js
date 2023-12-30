// order.model.js

import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  code: Number,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
  }],
  total: Number,
  status: { type: String, default: 'pending', enum: ['pending', 'completed', 'cancelled'] },
}, { timestamps: true });

orderSchema.pre('find', function() {
  this.populate('business', 'name').populate('user');
});

export default mongoose.model('Order', orderSchema);
