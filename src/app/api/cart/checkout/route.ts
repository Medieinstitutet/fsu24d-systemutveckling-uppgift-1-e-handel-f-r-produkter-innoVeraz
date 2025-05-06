import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';
import Order from '@/features/orders/models/order.model';
import Customer from '@/features/customers/models/customer.model';

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
    
    // Skapa eller hämta kund
    let customerDoc;
    
    // Om vi har en befintlig kund med samma e-post, använd den
    const existingCustomer = await Customer.findOne({ email: customer.email });
    
    if (existingCustomer) {
      customerDoc = existingCustomer;
    } else {
      // Skapa en ny kund med rätt struktur enligt modellen
      const [firstname, ...lastnameParts] = customer.name.split(' ');
      const lastname = lastnameParts.join(' ') || ''; 
      
      const newCustomer = new Customer({
        firstname,
        lastname,
        email: customer.email,
        phone: customer.phone || '',
        address: {
          street: customer.address || '',
          city: '',
          postal_code: '',
          country: 'Sverige'
        }
      });
      
      customerDoc = await newCustomer.save();
    }
    
    // Create order with reference to customer
    const order = new Order({
      customer: {
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone
      },
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