import { CartItem } from '../types';

/**
 * Calculate total price of items in cart
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

/**
 * Format the cart total with currency
 */
export function formatCartTotal(total: number, currency = 'SEK'): string {
  return `${total.toFixed(2)} ${currency}`;
}

/**
 * Calculate total number of items in cart
 */
export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Check if a product is already in the cart
 */
export function isInCart(items: CartItem[], productId: string): boolean {
  return items.some(item => item.product._id === productId);
}

/**
 * Find an item in the cart by product ID
 */
export function findCartItem(items: CartItem[], productId: string): CartItem | undefined {
  return items.find(item => item.product._id === productId);
}

/**
 * Create a cart summary for display
 */
export function createCartSummary(items: CartItem[]): { 
  itemCount: number;
  total: number;
  uniqueItems: number;
} {
  return {
    itemCount: calculateItemCount(items),
    total: calculateTotal(items),
    uniqueItems: items.length
  };
}