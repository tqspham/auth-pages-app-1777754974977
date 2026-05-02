import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { randomBytes } from 'crypto';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  sessionToken?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required', error: 'Invalid email' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Password is required', error: 'Invalid password' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('auth_pages_app_1777754974977_users')
      .select('id, password_hash')
      .eq('email', email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password', error: 'Authentication failed' },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, data.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password', error: 'Authentication failed' },
        { status: 401 }
      );
    }

    const sessionToken = randomBytes(32).toString('hex');

    return NextResponse.json(
      { success: true, message: 'Login successful', sessionToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
