import mongoose, { Schema, Document } from 'mongoose';
import { connectMongo } from '@/lib/database';

// Ensure database connection
connectMongo();

// Order item schema
export interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

// Customer information schema
export interface CustomerInfo {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

// Order status type
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order document interface
export interface OrderDocument extends Document {
  customer: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentInfo?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Order schema
const OrderSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: String,
    phone: String
  },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  total: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentInfo: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Only create the model if it doesn't already exist
const Order = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;