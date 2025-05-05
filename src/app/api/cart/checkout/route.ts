import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    // Connect to database
    await connectMongo();
    
    // Get checkout data from request body
    const { items, customer } = await request.json();
    
    // Calculate total
    const total = items.reduce(
      (sum: number, item: any) => sum + (item.product.price * item.quantity),
      0
    );
    
    // Create order
    const order = new Order({
      customer: customer,
      items: items.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      total,
      status: 'pending'
    });
    
    await order.save();
    
    return NextResponse.json(
      { 
        success: true, 
        orderId: order._id 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}