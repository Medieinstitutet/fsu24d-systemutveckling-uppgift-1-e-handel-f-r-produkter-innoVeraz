import { CartItem } from '../types';

// Dessa funktioner ska bara användas på serversidan
// För att undvika klientsidans import av mongoose
export const serverCartApi = {
  // För att spara kundvagnen i databasen för inloggade användare
  saveCartToDb: async (customerId: string, items: CartItem[]) => {
    // Denna kod ska bara köras på serversidan, vi importerar dynamiskt här
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

  // För att hämta kundvagnen från databasen för inloggade användare
  getCartFromDb: async (customerId: string) => {
    // Denna kod ska bara köras på serversidan
    const connectMongo = (await import('@/lib/mongoose')).default;
    const CartModel = (await import('@/features/cart/models/cart.model')).default;
    
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
  }
};

// Client-side API functions for cart - säker att använda i webbläsaren
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