import mongoose from 'mongoose';

const productQuantitySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
}, { _id: false });

const productOrderSchema = new mongoose.Schema({
  // id: { type: String, required: true },
  products: [productQuantitySchema],
}, { timestamps: true });


productOrderSchema.pre('find', function () {
  this.populate('products.productId');
});


export default mongoose.model('Cart', productOrderSchema);

// cart.model.js

// import mongoose from 'mongoose';

// const productQuantitySchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, required: true },
//   productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// });

// const productOrderSchema = new mongoose.Schema({
//   products: [productQuantitySchema],
// }, { _id: false });

// const cartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [productQuantitySchema],
//   order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Nueva referencia a la orden
// }, { timestamps: true });

// export default mongoose.model('Cart', cartSchema);
