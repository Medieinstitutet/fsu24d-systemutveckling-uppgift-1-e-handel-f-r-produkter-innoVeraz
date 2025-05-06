// Client-side API functions for products
import { Product } from '../types';

// Base URL for API calls
const API_BASE_URL = '/api/products';

export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },
  
  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    
    return response.json();
  },
  
  // Get products by category
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}?category=${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
    
    return response.json();
  },
  
  // Create a new product
  create: async (productData: Omit<Product, '_id'>): Promise<Product> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },
  
  // Update a product
  update: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update product with id ${id}`);
    }
    
    return response.json();
  },
  
  // Delete a product
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product with id ${id}`);
    }
  }
};