import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create mock response
    const mockSubmission = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      is_read: false,
      created_at: new Date().toISOString()
    };

    console.log('Contact form submission received (mock):', mockSubmission);

    return NextResponse.json({ 
      success: true, 
      submission: mockSubmission,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 