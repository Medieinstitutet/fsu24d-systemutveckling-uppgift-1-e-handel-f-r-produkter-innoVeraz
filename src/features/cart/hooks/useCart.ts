// Re-export the useCart hook from context for better organization
// This allows components to import from hooks rather than directly from context
import { useCart as useCartContext } from '../context/cart-context';

export const useCart = useCartContext;