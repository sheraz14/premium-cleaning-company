import { Metadata } from 'next';
import { BookingWizard } from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Book Now - Professional Cleaning Services',
  description: 'Book your cleaning service online. Choose from house cleaning, office cleaning, and specialized services. Easy scheduling and instant quotes.',
  keywords: 'book cleaning service, online booking, house cleaning appointment, schedule cleaning, cleaning service booking',
};

export default function BookNowPage() {
  return <BookingWizard />;
} 