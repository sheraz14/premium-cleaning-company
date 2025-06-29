import { NextResponse } from 'next/server';

// Mock testimonials data
const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "House Cleaning",
    rating: 5,
    comment: "Absolutely amazing service! My house has never been cleaner. The team was professional, thorough, and respectful of my home.",
    image: "/images/testimonials/sarah.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Michael Chen",
    service: "Deep Cleaning",
    rating: 5,
    comment: "Outstanding deep cleaning service. They got into every corner and crevice. Highly recommend for anyone needing a thorough clean.",
    image: "/images/testimonials/michael.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    service: "Move In/Out",
    rating: 5,
    comment: "Made our move so much easier! They cleaned our old place spotless and prepared our new home perfectly. Worth every penny.",
    image: "/images/testimonials/emily.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "David Thompson",
    service: "Commercial Cleaning",
    rating: 5,
    comment: "Professional office cleaning that keeps our workspace pristine. Reliable, efficient, and always on time.",
    image: "/images/testimonials/david.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Lisa Wang",
    service: "Post-Renovation",
    rating: 5,
    comment: "After our kitchen renovation, they cleaned up all the construction dust and debris perfectly. Amazing attention to detail!",
    image: "/images/testimonials/lisa.jpg",
    created_at: new Date().toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json(mockTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(mockTestimonials);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, service, rating, comment, image } = body;

    // Validate required fields
    if (!name || !service || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Return mock response
    const mockTestimonial = {
      id: Date.now(),
      name,
      service,
      rating,
      comment,
      image: image || '/images/testimonials/default.jpg',
      created_at: new Date().toISOString()
    };

    console.log('Testimonial submitted (mock):', mockTestimonial);

    return NextResponse.json({ 
      success: true, 
      testimonial: mockTestimonial,
      message: 'Thank you for your testimonial!'
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 