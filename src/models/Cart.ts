import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
}, { _id: false });

const CartSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [CartItemSchema],
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
