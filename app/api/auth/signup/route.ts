import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

interface SignupRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
  userId?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SignupResponse>> {
  try {
    const body: SignupRequest = await request.json();
    const { email, password, passwordConfirmation } = body;

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

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters', error: 'Password too short' },
        { status: 400 }
      );
    }

    if (password !== passwordConfirmation) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match', error: 'Password mismatch' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format', error: 'Invalid email' },
        { status: 400 }
      );
    }

    const existingUser = await supabase
      .from('auth_pages_app_1777754974977_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser.data) {
      return NextResponse.json(
        { success: false, message: 'Email already registered', error: 'Email exists' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('auth_pages_app_1777754974977_users')
      .insert([{ email, password_hash: passwordHash }])
      .select('id')
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Failed to create account', error: error?.message || 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Account created successfully', userId: data.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
