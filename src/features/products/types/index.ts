export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductFormData = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>;