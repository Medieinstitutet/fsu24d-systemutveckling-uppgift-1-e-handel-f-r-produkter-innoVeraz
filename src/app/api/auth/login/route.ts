import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';
import { authService } from '@/features/auth/services/auth-service';

export async function POST(request: Request) {
  try {

    await connectMongo();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const user = await authService.login(email, password);
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Login API error:', error);
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}