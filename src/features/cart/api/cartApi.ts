import { CartItem } from '../types';
import connectMongo from '@/lib/mongoose';
import CartModel from '@/features/cart/models/cart.model';

// För att spara kundvagnen i databasen för inloggade användare
export const saveCartToDb = async (customerId: string, items: CartItem[]) => {
  try {
    await connectMongo();

    const cartItems = items.map(item => ({
      product_id: item.product._id,
      quantity: item.quantity,
    }));

    await CartModel.findOneAndUpdate(
      { customer_id: customerId },
      { 
        customer_id: customerId, 
        items: cartItems 
      },
      { upsert: true, new: true }
    );

    return true;
  } catch (error) {
    console.error('Error saving cart to database:', error);
    return false;
  }
};

// För att hämta kundvagnen från databasen för inloggade användare
export const getCartFromDb = async (customerId: string) => {
  try {
    await connectMongo();
    
    const cart = await CartModel.findOne({ customer_id: customerId })
      .populate('items.product_id');
    
    if (!cart) return { items: [] };
    
    // Formatera om datan för att matcha vår klient-side struktur
    const formattedItems = cart.items.map((item: any) => ({
      product: item.product_id,
      quantity: item.quantity
    }));
    
    return { items: formattedItems };
  } catch (error) {
    console.error('Error fetching cart from database:', error);
    return { items: [] };
  }
};

// Client-side API functions for cart
const API_BASE_URL = '/api/cart';

export const cartApi = {
  // Get cart contents from the server (if you implement server-side carts)
  getCart: async (userId?: string): Promise<CartItem[]> => {
    // If implementing server-side carts, this would fetch from API
    // Currently using localStorage in cart-context.tsx
    return [];
  },
  
  // Save cart to the server (for persistent carts)
  saveCart: async (items: CartItem[], userId?: string): Promise<void> => {
    // This would send the cart to be stored on the server
    // Currently using localStorage in cart-context.tsx
  },
  
  // Process checkout
  checkout: async (cartItems: CartItem[], customerInfo: any): Promise<{ orderId: string }> => {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        customer: customerInfo
      }),
    });
    
    if (!response.ok) {
      throw new Error('Checkout failed');
    }
    
    return response.json();
  }
};