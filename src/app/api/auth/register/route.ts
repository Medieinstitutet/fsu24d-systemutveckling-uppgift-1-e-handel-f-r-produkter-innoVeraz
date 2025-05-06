import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/database';
import { authService } from '@/features/auth/services/auth-service';

export async function POST(request: Request) {
  try {

    await connectMongo();
    

    const userData = await request.json();
    

    if (!userData.email || !userData.password || !userData.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const user = await authService.register(userData);
    
    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration API error:', error);
    
    if (error.message.includes('User already exists')) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}