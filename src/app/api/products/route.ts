import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { createProduct } from '@/services/product-service';

export async function POST(request: NextRequest) {
  try {
    console.log('API: Produktförfrågan mottagen');
    
    // Anslut till MongoDB
    await connectMongo();
    console.log('API: Ansluten till MongoDB');
    
    // Hämta data från formuläret
    const productData = await request.json();
    console.log('API: Mottagen produkt data:', JSON.stringify(productData, null, 2));
    
    // Spara produkt i databasen
    const newProduct = await createProduct(productData);
    console.log('API: Produkt sparad framgångsrikt:', JSON.stringify(newProduct, null, 2));
    
    // Returnera lyckad respons
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('API: Fel vid hantering av produkt:', error);
    return NextResponse.json(
      { success: false, error: 'Kunde inte spara produkten' }, 
      { status: 500 }
    );
  }
}