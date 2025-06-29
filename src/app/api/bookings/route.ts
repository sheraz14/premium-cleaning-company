import { NextRequest, NextResponse } from 'next/server';

// Helper: Validate email format
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper: Validate phone format
function isValidPhone(phone: string) {
  // Basic phone validation - can be enhanced based on your needs
  return /^[\d\s\-\(\)\+]+$/.test(phone);
}

// Helper: Check if date is in the future
function isFutureDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  return date > now;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, service_type, booking_date, message, time } = body;

    // Validate required fields
    if (!name || !email || !phone || !address || !service_type || !booking_date || !time) {
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
    if (!isFutureDate(booking_date)) {
      return NextResponse.json({ error: 'Booking date must be in the future' }, { status: 400 });
    }

    // Return mock success response
    const mockBooking = {
      id: Date.now(),
      name,
      email,
      phone,
      address,
      service_type,
      booking_date,
      message,
      status: 'pending',
      time,
      created_at: new Date().toISOString()
    };

    console.log('Booking request received (mock):', mockBooking);

    return NextResponse.json({ 
      success: true, 
      booking: mockBooking,
      message: 'Booking request received! We will contact you soon to confirm your appointment.'
    });
  } catch (error) {
    console.error('Error processing booking submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 