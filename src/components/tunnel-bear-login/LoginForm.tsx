'use client';
import { FormEvent, useRef, useState } from 'react';
import { useBearImages } from './useBearImages';
import { useBearAnimation } from './useBearAnimation';
import BearAvatar from './BearAvatar';
import Input from './Input';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const EyeIconSrc = '/images/tunnel-bear/eye_on.svg';
const EyeOffIconSrc = '/images/tunnel-bear/eye_off.svg';

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { watchBearImages, hideBearImages, peakBearImages } =
    useBearImages();
  const {
    currentBearImage,
    setCurrentFocus,
    currentFocus,
    isAnimating,
  } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    peakBearImages,
    emailLength: values.email.length,
    showPassword,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    const { email, password } = values;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
    
    setIsLoading(false);
  };

  const togglePassword = () => {
    if (!isAnimating) {
      setShowPassword((prev) => !prev);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-[130px] h-[130px] relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {currentBearImage && (
            <BearAvatar
              currentImage={currentBearImage}
              key={`${currentFocus}-${values.email.length}`}
            />
          )}
        </div>
      </div>
      <Input
        placeholder="Email"
        name="email"
        type="email"
        ref={emailRef}
        autoFocus
        onFocus={() => setCurrentFocus('EMAIL')}
        autoComplete="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <div className="w-full relative">
        <Input
          placeholder="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          ref={passwordRef}
          onFocus={() => setCurrentFocus('PASSWORD')}
          autoComplete="current-password"
          value={values.password}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute right-3 top-1/2 -translate-y-1/2
           text-gray-500 focus:outline-none transition-all duration-300
           hover:text-gray-700`}
        >
          {showPassword ? (
            <img
              src={EyeOffIconSrc}
              alt="Hide password"
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          ) : (
            <img
              src={EyeIconSrc}
              alt="Show password"
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          )}
        </button>
      </div>
      {error && (
        <div className="text-red-400 text-sm w-full text-center p-3 bg-red-500/10 backdrop-blur-sm rounded-lg border border-red-500/20">
          {error}
        </div>
      )}
      
      {/* Enhanced Login Button */}
      <div className="w-full relative group">
        {/* Button backdrop/glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        
        {/* Main button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            relative w-full py-4 px-6 rounded-xl font-bold text-lg text-white
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
            hover:from-blue-500 hover:via-purple-500 hover:to-pink-500
            focus:outline-none focus:ring-4 focus:ring-purple-500/50
            transform transition-all duration-300
            hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]
            backdrop-blur-sm border border-white/20
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            overflow-hidden
            ${isLoading ? 'animate-pulse' : 'hover:animate-none'}
          `}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Log In</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </div>
          
          {/* Ripple effect container */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-0 transform scale-0 bg-white/20 rounded-full group-active:scale-100 group-active:animate-ping transition-transform duration-300" />
          </div>
        </button>
      </div>
      
      <style jsx>{`
        @keyframes button-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(59, 130, 246, 0.5);
          }
        }
        
        .group:hover .relative {
          animation: button-glow 2s ease-in-out infinite;
        }
      `}</style>
    </form>
  );
} 