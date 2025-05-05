// Backend product service
import Product from '@/features/products/models/product.model';
import type { Product as ProductType } from '../types';

export const productService = {
  /**
   * Get all products from the database
   */
  getAll: async () => {
    return Product.find({});
  },
  
  /**
   * Get a product by its ID
   */
  getById: async (id: string) => {
    return Product.findById(id);
  },
  
  /**
   * Get products by category
   */
  getByCategory: async (category: string) => {
    return Product.find({ category });
  },
  
  /**
   * Create a new product
   */
  create: async (productData: Omit<ProductType, '_id'>) => {
    const product = new Product(productData);
    return product.save();
  },
  
  /**
   * Update an existing product
   */
  update: async (id: string, productData: Partial<Omit<ProductType, '_id'>>) => {
    return Product.findByIdAndUpdate(id, productData, { new: true });
  },
  
  /**
   * Delete a product
   */
  delete: async (id: string) => {
    return Product.findByIdAndDelete(id);
  }
};
