import { useState, useEffect } from 'react';
import { productsApi } from '../api/products-api';
import type { Product } from '../types';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let data: Product[];
        
        if (category) {
          data = await productsApi.getByCategory(category);
        } else {
          data = await productsApi.getAll();
        }
        
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return {
    products,
    isLoading,
    error
  };
}