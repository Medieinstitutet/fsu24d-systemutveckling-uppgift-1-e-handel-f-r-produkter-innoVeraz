import Product from '@/models/Product';

export async function getProducts() {
  return Product.find({});
}

export async function createProduct(productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url?: string;
}) {
  const product = new Product(productData);
  return product.save();
}
