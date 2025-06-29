import { NextResponse } from 'next/server';

// Mock services data for frontend
const mockServices = [
  {
    id: 1,
    name: "House Cleaning",
    description: "Complete house cleaning service including all rooms, kitchen, and bathrooms",
    price: 120,
    duration: "2-3 hours",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Deep Cleaning",
    description: "Thorough deep cleaning service including baseboards, windows, and inside appliances",
    price: 180,
    duration: "4-5 hours",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Move In/Out Cleaning",
    description: "Complete move in or move out cleaning service",
    price: 200,
    duration: "5-6 hours",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "Commercial Cleaning",
    description: "Professional office and commercial space cleaning",
    price: 250,
    duration: "3-4 hours",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Post-Renovation Cleaning",
    description: "Specialized cleaning after construction or renovation work",
    price: 300,
    duration: "6-8 hours",
    created_at: new Date().toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json(mockServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(mockServices);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, duration } = body;

    // Validate required fields
    if (!name || !description || !price || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Return mock response
    const mockResponse = {
      id: Date.now(),
      name,
      description,
      price,
      duration,
      created_at: new Date().toISOString()
    };
    
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 