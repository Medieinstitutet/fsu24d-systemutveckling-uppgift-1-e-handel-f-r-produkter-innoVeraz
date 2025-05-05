import { NextResponse } from 'next/server';
import { productService } from '@/features/products/services/product-service';
import { connectMongo } from '@/lib/database';

export async function GET(request: Request) {
  try {
    // Connect to database
    await connectMongo();
    
    // Get URL parameters safely
    let category;
    try {
      // Try using the NextRequest searchParams directly
      const { searchParams } = new URL(request.url);
      category = searchParams.get('category');
    } catch (error) {
      console.error('URL parsing error:', error);
      // Fallback to manual parsing if URL parsing fails
      const queryString = request.url.split('?')[1] || '';
      const params = new URLSearchParams(queryString);
      category = params.get('category');
    }
    
    let products;
    
    if (category) {
      // Get products by category
      products = await productService.getByCategory(category);
    } else {
      // Get all products
      products = await productService.getAll();
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Connect to database
    await connectMongo();
    
    // Get product data from request body
    const productData = await request.json();
    
    // Create new product
    const newProduct = await productService.create(productData);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Create product API error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}