import { Product } from '../types';

/**
 * Sort products by different criteria
 */
export function sortProducts(products: Product[], sortBy: 'price' | 'name' | 'newest', order: 'asc' | 'desc' = 'asc') {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price':
      return sortedProducts.sort((a, b) => 
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
    case 'name':
      return sortedProducts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        const comparison = nameA.localeCompare(nameB);
        return order === 'asc' ? comparison : -comparison;
      });
    case 'newest':
      return sortedProducts.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    default:
      return sortedProducts;
  }
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(products: Product[], minPrice?: number, maxPrice?: number) {
  return products.filter(product => {
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    return true;
  });
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency = 'SEK') {
  return `${price.toFixed(2)} ${currency}`;
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product) {
  return product.stock > 0;
}

/**
 * Get stock status display text
 */
export function getStockStatus(product: Product) {
  if (product.stock <= 0) return 'Slut i lager';
  if (product.stock < 5) return 'Få kvar';
  return 'Tillgänglig';
}