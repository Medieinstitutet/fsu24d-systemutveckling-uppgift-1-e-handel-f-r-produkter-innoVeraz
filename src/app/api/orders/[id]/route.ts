import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';
import Order from '@/features/orders/models/order.model';

// GET en specifik order med ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    
    const order = await Order.findById(params.id).populate('items.product');
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH för att uppdatera orderstatus
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    
    const { status } = await request.json();
    
    // Kontrollera att statusen är giltig
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}