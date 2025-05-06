import mongoose, { Schema, Document } from 'mongoose';
import { connectMongo } from '@/lib/database';


connectMongo();

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't return password by default
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});


const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;