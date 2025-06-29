'use client';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/tunnel-bear-login/LoginForm';

export default function LoginPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Interactive Animated Navy Blue Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`,
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(15, 23, 42, 0.95) 0%, 
                      rgba(30, 58, 138, 0.8) 25%, 
                      rgba(1, 11, 47, 0.9) 50%, 
                      rgba(2, 6, 23, 1) 100%)`
        }}
      />
      
      {/* Interactive Floating Orbs - Navy Blue */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large interactive orb - follows mouse */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-800/25 to-blue-700/20 rounded-full blur-3xl transition-all duration-700 ease-out animate-pulse"
          style={{
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.8}%`,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
          }}
        />
        
        {/* Medium orb - inverse mouse movement */}
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-slate-800/22 to-blue-900/15 rounded-full blur-2xl transition-all duration-1000 ease-out"
          style={{
            left: `${100 - mousePosition.x * 0.6}%`,
            top: `${100 - mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Small accent orbs */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-r from-blue-700/18 to-blue-600/12 rounded-full blur-xl transition-all duration-500"
          style={{
            left: `${mousePosition.x * 0.3 + 20}%`,
            top: `${mousePosition.y * 0.3 + 30}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-24 h-24 bg-gradient-to-r from-blue-800/15 to-slate-800/10 rounded-full blur-lg transition-all duration-800"
          style={{
            left: `${100 - mousePosition.x * 0.4}%`,
            top: `${mousePosition.y * 0.4 + 10}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      
      {/* Interactive Grid Pattern - Navy Blue */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-500"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
          background: `
            linear-gradient(rgba(59, 130, 246, ${0.08 + mousePosition.x * 0.0008}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${0.08 + mousePosition.y * 0.0008}) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Interactive Sparkles - Navy Blue */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/40 rounded-full animate-pulse"
            style={{
              left: `${(mousePosition.x + i * 15) % 100}%`,
              top: `${(mousePosition.y + i * 20) % 100}%`,
              opacity: 0.08 + (mousePosition.x + mousePosition.y) * 0.0015,
              animationDelay: `${i * 0.2}s`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      
      {/* Login Form Container */}
      <div 
        className="relative z-10 w-full max-w-md mx-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/50 dark:bg-slate-950/60 p-8 rounded-3xl shadow-2xl border border-blue-800/40 dark:border-blue-700/30 backdrop-saturate-150 transition-all duration-300 hover:bg-slate-900/60 hover:border-blue-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105 border border-blue-600/50">
              <svg className="w-8 h-8 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-50 mb-3 animate-fade-in">Welcome Back</h1>
            <p className="text-blue-200 dark:text-blue-300 animate-fade-in-delayed">Sign in to your account</p>
          </div>
          
          {/* Login Form */}
        <LoginForm />
          
          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-blue-800/30 dark:border-blue-700/20">
            <p className="text-sm text-center text-blue-300 dark:text-blue-400 animate-fade-in-slow">
              Professional cleaning services you can trust
            </p>
          </div>
        </div>
        
        {/* Interactive Glow Effect - Navy Blue */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-slate-800/15 rounded-3xl blur-xl -z-10 transition-all duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) ${isHovering ? 'scale(1.05)' : 'scale(1)'}`,
            opacity: isHovering ? 0.7 : 0.4,
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.2s both;
        }
        
        .animate-fade-in-slow {
          animation: fade-in-slow 1s ease-out 0.4s both;
        }
        
        @keyframes cursor-follow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 