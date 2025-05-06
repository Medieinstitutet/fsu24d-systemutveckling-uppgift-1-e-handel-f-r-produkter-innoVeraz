import { CartItem } from '../types';


export const serverCartApi = {

  saveCartToDb: async (customerId: string, items: CartItem[]) => {

    const connectMongo = (await import('@/lib/mongoose')).default;
    const CartModel = (await import('@/features/cart/models/cart.model')).default;
    
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
  },

  getCartFromDb: async (customerId: string) => {

    const connectMongo = (await import('@/lib/mongoose')).default;
    const CartModel = (await import('@/features/cart/models/cart.model')).default;
    
    try {
      await connectMongo();
      
      const cart = await CartModel.findOne({ customer_id: customerId })
        .populate('items.product_id');
      
      if (!cart) return { items: [] };

      const formattedItems = cart.items.map((item: any) => ({
        product: item.product_id,
        quantity: item.quantity
      }));
      
      return { items: formattedItems };
    } catch (error) {
      console.error('Error fetching cart from database:', error);
      return { items: [] };
    }
  }
};

const API_BASE_URL = '/api/cart';

export const cartApi = {

  getCart: async (userId?: string): Promise<CartItem[]> => {

    return [];
  },
  

  saveCart: async (items: CartItem[], userId?: string): Promise<void> => {

  },
  

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