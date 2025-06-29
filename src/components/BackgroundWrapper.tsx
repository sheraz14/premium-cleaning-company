'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Full-screen background with pure CSS that stays fixed during scroll */}
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: `url('/images/gallery/vector.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Ensures background stays fixed during scroll
          opacity: 0.25,
        }}
      />
      
      {/* Content */}
      {children}
    </div>
  );
} 