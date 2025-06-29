import { CTA } from "@/components/CTA";
import { HeroSection } from "./HeroSection";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { GetInTouch } from "@/components/GetInTouch";
import { Home, Sparkles, ShieldCheck, Star, Users, CalendarCheck2 } from "lucide-react";
import { CleaningChecklist } from "@/components/CleaningChecklist";

export const metadata = {
  title: "House Cleaning Services | Dust Drifters",
  description: "Our comprehensive house cleaning service transforms your living space into a spotless sanctuary. We meticulously clean every corner and surface.",
};

export default function HouseCleaningPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CleaningChecklist />
      <CTA />
      {/* Why Invest in Professional House Cleaning? Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md mb-4 justify-center"
            >
              <Home className="h-5 w-5 mr-2 text-purple-500" />
              <span className="text-base font-medium">
                Why Invest?
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-pink-700 to-emerald-600 bg-clip-text text-transparent">
              Why Invest in Professional House Cleaning?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-purple-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-purple-800 mb-3">More Free Time</h4>
              <p className="text-purple-900/80">Enjoy your home and spend more time with loved ones while we handle the cleaning chores for you.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-purple-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-purple-800 mb-3">Healthier Living</h4>
              <p className="text-purple-900/80">Our thorough cleaning reduces allergens, dust, and germs, creating a healthier environment for your family.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-purple-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-purple-800 mb-3">A Home to Be Proud Of</h4>
              <p className="text-purple-900/80">A spotless home is welcoming for guests and gives you peace of mind every day.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-purple-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-purple-800 mb-3">Focus on What Matters</h4>
              <p className="text-purple-900/80">Let us handle the cleaning so you can focus on your family, hobbies, and relaxation.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-purple-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <CalendarCheck2 className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-purple-800 mb-3">Flexible Scheduling</h4>
              <p className="text-purple-900/80">We work around your schedule to keep your home clean when it's most convenient for you.</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Why Invest section */}
      <TestimonialsMarquee />
        <div className="my-12 h-6 w-full bg-gradient-to-r from-purple-200 via-pink-100 to-emerald-100 rounded-full opacity-80" />
        <div className="mt-16">
          <GetInTouch />
        </div>
      {/* If you have a Footer component, you can add it here, e.g. <Footer /> */}
    </main>
  );
} 