-- Create a table for services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample data for services
INSERT INTO services (name, description, price, duration) VALUES
('Basic House Cleaning', 'Standard cleaning service for homes up to 2,000 sq ft.', 120.00, 120),
('Deep Cleaning', 'Thorough cleaning of all areas including hard-to-reach spots.', 200.00, 240),
('Move In/Out Cleaning', 'Comprehensive cleaning for moving in or out of a property.', 250.00, 300),
('Office Cleaning', 'Professional cleaning for commercial spaces and offices.', 180.00, 180);

-- Insert some sample testimonials
INSERT INTO testimonials (name, role, content, rating, is_featured) VALUES
('Sarah Johnson', 'Homeowner', 'I''ve been using Dust Drifters for over a year now, and I couldn''t be happier with their service. The team is always punctual, thorough, and friendly. My home has never looked better!', 5, TRUE),
('Michael Chen', 'Office Manager', 'We switched to Dust Drifters for our office cleaning needs six months ago, and the difference is remarkable. Their attention to detail and consistent quality has made our workspace more pleasant for everyone.', 5, TRUE),
('Emily Rodriguez', 'Property Manager', 'Managing multiple properties means I need reliable cleaning services. Dust Drifters has exceeded my expectations with their professionalism and flexibility. They''ve made my job so much easier!', 5, TRUE),
('David Thompson', 'Restaurant Owner', 'In the food industry, cleanliness is paramount. Dust Drifters understands our specific needs and delivers exceptional results every time. Their team is thorough and uses eco-friendly products, which we appreciate.', 4, TRUE); 