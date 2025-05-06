import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import Order from '@/features/orders/models/order.model';

import '@/features/products/models/product.model';

export async function GET(request: Request) {
  try {

    const MONGODB_URI = process.env.MONGODB_URI as string;
    if (!MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB URI is not defined' },
        { status: 500 }
      );
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: 'dbwebbshop',
      tls: true,
      tlsAllowInvalidCertificates: true, // För utveckling, ta bort i produktion
    });
    
    console.log('Mongoose connection established successfully');
    

    const orders = await Order.find({})
      .populate('items.product')
      .sort({ createdAt: -1 }) 
      .exec();
      
    console.log(`Found ${orders.length} orders`);
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}