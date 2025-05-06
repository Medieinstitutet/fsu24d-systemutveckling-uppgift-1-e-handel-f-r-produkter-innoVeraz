import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';

// This would use a Cart model if you implement server-side carts
// For now it's a simple API endpoint

export async function GET(request: Request) {
  try {
console.log('försöker ansluta')
    await connectMongo();
    
    // For now, return empty cart since we're using client-side storage
    return NextResponse.json([]);
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();

    const cartData = await request.json();
    
    // This would save the cart to the database (future implementation)
    // For now just echo back the data
    
    return NextResponse.json(cartData, { status: 200 });
  } catch (error) {
    console.error('Save cart API error:', error);
    return NextResponse.json(
      { error: 'Failed to save cart' },
      { status: 500 }
    );
  }
}