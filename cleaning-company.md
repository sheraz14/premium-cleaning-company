# Dust Drifters - Professional Cleaning Services Website

A modern, responsive website for Dust Drifters professional cleaning services, built with Next.js, React, and Tailwind CSS.

## Features

- Modern UI with animations and interactive elements
- Responsive design for all device sizes
- Video hero section with play/pause controls
- Animated statistics counters
- Image gallery with lightbox
- Testimonial carousel with auto-scrolling
- Live chat widget for customer support
- Contact and booking forms
- Service showcase
- Pricing plans

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   xnpm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Required Media Files

For the website to display correctly, you need to add the following media files:

### Videos

Add a cleaning service video to:
- `public/videos/cleaning-video.mp4`

You can use any professional cleaning service video. If you don't have one, you can use a stock video from sites like Pexels or Shutterstock.

### Images

#### Gallery Images

Add the following images to `public/images/gallery/`:
- `kitchen-cleaning.jpg`
- `bathroom-cleaning.jpg`
- `office-cleaning.jpg`
- `window-cleaning.jpg`
- `carpet-cleaning.jpg`
- `living-room.jpg`

#### Testimonial Profile Images

Add the following images to `public/images/testimonials/`:
- `person-1.jpg`
- `person-2.jpg`
- `person-3.jpg`
- `person-4.jpg`
- `person-5.jpg`

You can use professional stock photos for these images. Make sure they are properly sized and optimized for web use.

## Technologies Used

- Next.js 14
- React 19
- Tailwind CSS
- TypeScript
- Supabase (for backend)
- Shadcn UI Components

## Customization

You can customize the website by:

1. Modifying the color scheme in `tailwind.config.js`
2. Updating the content in the component files
3. Adding or removing sections in `page.tsx`
4. Changing the logo and branding elements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Supabase](https://supabase.com/)

# Dust Drifters - Technical Documentation

## Project Architecture

### Directory Structure
```typescript
cleaning-company/
├── src/
│   ├── app/         # Next.js app router pages and layouts
│   ├── components/  # Reusable React components
│   ├── lib/         # Utility functions and configurations
│   └── types/       # TypeScript type definitions
├── public/          # Static assets (images, videos)
├── supabase/        # Supabase configurations and migrations
└── ...config files  # Various configuration files
```

## Technical Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **Animations**: Framer Motion

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **API**: Next.js API Routes

## Core Features Implementation

### 1. Authentication System
- Implemented using Supabase Auth
- JWT-based authentication
- Protected routes using middleware
- Role-based access control (Admin/User)

### 2. Booking System
- Real-time availability checking
- Integration with payment gateway
- Email notifications
- Booking confirmation system

### 3. Admin Dashboard
- Service management
- Booking management
- Customer management
- Analytics and reporting

### 4. Customer Portal
- Booking history
- Profile management
- Service scheduling
- Payment history

## Responsive Design Implementation

### 1. Mobile-First Approach
- All components are built with a mobile-first philosophy
- Tailwind's responsive breakpoints used consistently throughout the site
- Proper viewport meta tag with scalable settings
- Optimized touch targets for mobile users (minimum 44px size)

### 2. Header & Navigation
- Collapsible mobile navigation with hamburger menu
- Dropdown menus that work on both touch and mouse devices
- Properly scaled logo and buttons for different screen sizes
- Fixed positioning that adapts to different device heights

### 3. Layout Structure
- Container with responsive maximum widths and paddings
- Adaptive spacing using responsive utility classes
- Flexible grid layouts that reflow on smaller screens
- Proper z-index management for overlapping elements

### 4. Typography & Media
- Responsive font sizes that scale properly across devices
- Fluid typography for headings using clamp() where appropriate
- Images and videos with proper aspect ratios
- Media queries to adjust styles based on device capabilities

### 5. Performance Optimizations
- Reduced motion preferences respected
- Optimized animation performance on mobile devices
- Efficient DOM updates to prevent layout thrashing
- Proper accessibility considerations for all screen sizes

## Database Schema

### Users Table
```sql
users (
  id: uuid primary key
  email: string
  full_name: string
  role: enum('admin', 'customer')
  created_at: timestamp
)
```

### Bookings Table
```sql
bookings (
  id: uuid primary key
  user_id: uuid foreign key
  service_id: uuid foreign key
  booking_date: timestamp
  status: enum('pending', 'confirmed', 'completed', 'cancelled')
  total_amount: decimal
  created_at: timestamp
)
```

### Services Table
```sql
services (
  id: uuid primary key
  name: string
  description: text
  price: decimal
  duration: integer
  active: boolean
)
```

## API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Bookings
- `GET /api/bookings`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `DELETE /api/bookings/:id`

### Services
- `GET /api/services`
- `POST /api/services` (admin only)
- `PUT /api/services/:id` (admin only)
- `DELETE /api/services/:id` (admin only)

## Performance Optimization

1. **Image Optimization**
   - Next.js Image component for automatic optimization
   - WebP format support
   - Lazy loading implementation

2. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting
   - Lazy loading of heavy libraries

3. **Caching Strategy**
   - Static page generation where possible
   - Incremental Static Regeneration for dynamic content
   - API response caching

## Security Measures

1. **Authentication**
   - JWT token validation
   - CSRF protection
   - Rate limiting on authentication endpoints

2. **Data Protection**
   - Input validation
   - SQL injection prevention
   - XSS protection

3. **API Security**
   - Rate limiting
   - Request validation
   - Error handling

## Development Workflow

1. **Local Development**
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Testing**
   ```bash
   pnpm test
   pnpm test:e2e
   ```

3. **Deployment**
   ```bash
   pnpm build
   pnpm start
   ```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=your_site_url
STRIPE_SECRET_KEY=your_stripe_secret_key
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

## Maintenance and Updates

1. **Regular Updates**
   - Dependencies updates
   - Security patches
   - Feature updates

2. **Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics

3. **Backup Strategy**
   - Database backups
   - File storage backups
   - Configuration backups

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Support and Contact

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## New Feature: Tunnel Bear Animated Login Page

- Added a new animated login page at `/login` using the Tunnel Bear bear animation.
- Migrated components: BearAvatar, Input, LoginForm, and hooks: useBearAnimation, useBearImages.
- Bear animation images and icons are placed in `public/images/tunnel-bear/`.
- Login form is connected to Supabase Auth for authentication.
- Added `tunnel-bear` color (#cce08b) to Tailwind config for consistent theming.
- All login logic and animation are encapsulated in the new components and hooks.

### Database Schema (unchanged for login):
```sql
users (
  id: uuid primary key
  email: string
  full_name: string
  role: enum('admin', 'customer')
  created_at: timestamp
)
```

## UI/UX: Mobile Menu Dropdown

- On mobile devices, when the menu is opened, it covers the entire screen (`fixed inset-0`, `z-50`, `bg-white`).
- The page behind the menu cannot be scrolled while the menu is open (body gets `overflow-hidden`).
- The menu itself is scrollable (`overflow-y-auto`, `max-h-screen`), including the services sub-menu if it is long.
- There is a cross (X) button at the top right of the menu to close it.
- The services dropdown arrow toggles the sub-menu open/close. Clicking the arrow again closes the sub-menu.
- Only the menu can be scrolled when open; the rest of the page is locked.

## Major Feature Update (Services Routing)

- The following service pages have been moved from `/services/[service]` to new top-level routes:
  - `/house-cleaning-services`
  - `/condo-and-apartment-cleaning-services`
  - `/move-in-out-cleaning-services`
  - `/deep-cleaning-services`
  - `/post-renovation-cleaning-services`
  - `/airbnb-cleaning-services`
  - `/rental-cleaning-services`
  - `/commercial-cleaning-services`
  - `/eco-friendly-cleaning-services`
- The navigation bar and all internal links have been updated to reflect these new routes.
- Each of these routes now has its own directory and `page.tsx` under `src/app/`.

## Migrations

- Service pages migrated to top-level routes as described above.
