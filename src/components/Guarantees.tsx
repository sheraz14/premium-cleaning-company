import { motion } from "framer-motion";
import { Heart, Shield, Phone, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const guarantees = [
  {
    icon: Heart,
    title: "A Team That's Cared For",
    description:
      "We believe a happy team delivers exceptional service. That's why we're proud to be a living wage employer, ensuring our dedicated professionals are valued and motivated to make your home shine.",
  },
  {
    icon: Shield,
    title: "Your Safety is Our Priority",
    description:
      "Your peace of mind is paramount. All our cleaning professionals are fully insured, bonded, and undergo comprehensive background checks and continuous training to ensure the highest standards of safety and quality.",
  },
  {
    icon: Phone,
    title: "Support When You Need It",
    description:
      "Questions or special requests? Our friendly customer support team is here for you. Connect with us anytime for a seamless and responsive experience.",
  },
  {
    icon: CreditCard,
    title: "Flexible & Secure Payments",
    description:
      "Experience hassle-free booking with our secure payment system. We only process payments after your cleaning is complete, and we offer flexible cancellations up to 24 hours before your service, free of charge.",
  },
];

export function Guarantees() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      className="mt-8"
    >
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-white/50">
        <CardContent className="pt-6">
          {guarantees.map((item) => (
            <div key={item.title} className="text-center mb-6 last:mb-0">
              <item.icon className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 px-2">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
} 