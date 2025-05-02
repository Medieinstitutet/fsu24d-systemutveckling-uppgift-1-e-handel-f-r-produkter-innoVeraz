import { createProduct, getProducts } from "@/services/product-service";
import connectMongo from "@/lib/mongoose";

export async function GET() {
  try {
    await connectMongo();
    
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response('Failed to fetch products', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    
    const body = await request.json();
    const newProduct = await createProduct(body);
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response('Failed to create product', { status: 500 });
  }
}
