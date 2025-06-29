import React from "react";
import Image from "next/image";
import { BookingForm } from "./BookingForm";

// Adjust the import path if not using Next.js Image
import bookingSide from "../../public/bookingSide.png";

export function BookingSection() {
  return (
    <section id="booking-section" className="w-full min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Side: Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={bookingSide}
          alt="Booking Side Illustration"
          fill
          style={{ objectFit: "cover" }}
          className="hidden md:block"
          priority
        />
        {/* For mobile, show image at top */}
        <Image
          src={bookingSide}
          alt="Booking Side Illustration"
          width={800}
          height={400}
          className="block md:hidden w-full h-64 object-cover"
        />
      </div>
      {/* Right Side: Booking Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12 bg-white">
        <div className="w-full max-w-2xl">
          <BookingForm />
        </div>
      </div>
    </section>
  );
} 