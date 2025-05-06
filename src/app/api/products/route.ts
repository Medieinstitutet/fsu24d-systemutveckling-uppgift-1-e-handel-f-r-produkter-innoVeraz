import { NextResponse } from 'next/server';
import { productService } from '@/features/product-management/services/product-service';
import { connectMongo } from '@/lib/database';

export async function GET(request: Request) {
  try {
    await connectMongo();
    
    let category;
    try {

      const { searchParams } = new URL(request.url);
      category = searchParams.get('category');
    } catch (error) {
      console.error('URL parsing error:', error);

      const queryString = request.url.split('?')[1] || '';
      const params = new URLSearchParams(queryString);
      category = params.get('category');
    }
    
    let products;
    
    if (category) {

      products = await productService.getByCategory(category);
    } else {

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
    await connectMongo();
    
    const productData = await request.json();
    
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