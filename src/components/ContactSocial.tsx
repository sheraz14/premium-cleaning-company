"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export function ContactSocial() {
  return (
    <section className="py-12 sm:py-14 md:py-16 pt-6 sm:pt-8 bg-gradient-to-b from-white via-slate-50 to-gray-100 relative overflow-hidden">
      {/* Top gradient fade for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-20"></div>
      
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(/images/backgrounds/cleaning-icons-pattern.png)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm text-purple-800 shadow-sm mb-3 sm:mb-4"
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base font-medium">
              Follow Our Journey
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
            Connect on Social Media
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Stay updated with cleaning tips, before & after photos, and special offers!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12 px-4">
          {[
            { icon: Facebook, name: "Facebook", color: "from-blue-600 to-blue-700", href: "#" },
            { icon: Instagram, name: "Instagram", color: "from-pink-500 to-purple-600", href: "#" },
            { icon: Twitter, name: "Twitter", color: "from-blue-400 to-blue-500", href: "#" },
            { icon: Linkedin, name: "LinkedIn", color: "from-blue-700 to-blue-800", href: "#" }
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-gradient-to-br ${social.color} p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white min-w-[160px] sm:min-w-[180px] md:min-w-[200px] text-center`}
            >
              <div className="relative z-10">
                <social.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{social.name}</h3>
                <p className="text-xs sm:text-sm opacity-90">Follow us for updates</p>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
          ))}
        </div>

        <div className="text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4"
          >
            Get cleaning tips, see our work, and join our community of satisfied customers!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center text-purple-600 font-medium text-sm sm:text-base"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Tag us in your posts for a chance to be featured!
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-100 z-20"></div>
    </section>
  );
} 