import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    postal_code: String,
    country: String
  },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
