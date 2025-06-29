import { NextRequest, NextResponse } from 'next/server';

// Helper: Validate email format
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper: Validate phone format
function isValidPhone(phone: string) {
  return /^[\d\s\-\(\)\+]+$/.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      position, 
      experience, 
      availability, 
      transportation, 
      background_check, 
      message 
    } = body;

    // Validate required fields
    if (!first_name || !last_name || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // Create mock response
    const mockApplication = {
      id: Date.now(),
      first_name,
      last_name,
      email,
      phone,
      position,
      experience: experience || '',
      availability: availability || '',
      transportation: transportation || false,
      background_check: background_check || false,
      message: message || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    console.log('Job application received (mock):', mockApplication);

    return NextResponse.json({ 
      success: true, 
      application: mockApplication,
      message: 'Thank you for your interest! We will review your application and get back to you soon.'
    });
  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 