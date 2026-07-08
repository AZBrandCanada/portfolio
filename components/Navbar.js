import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false); // Scroll detection

  // Dynamic Back-Navigation Engine: Checks history or redirects to main domain
  const handleBackNavigation = (e) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') {
      const hasHistory = window.history.length > 1;
      if (hasHistory && document.referrer) {
        window.history.back();
      } else {
        window.location.href = 'https://azbrand.ca';
      }
    }
  };

  // Dynamic Scroll Handler to adjust padding on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* ==================== EMBEDDED PRESETS (SHIMMER & BREATHING GLOW EFFECT) ==================== */}
      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          50%, 100% { transform: translateX(150%) skewX(-25deg); }
        }
        .animate-shimmer-sweep {
          animation: shimmerSweep 3.5s infinite ease-in-out;
        }
        @keyframes breathGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
          50% { box-shadow: 0 0 32px rgba(139, 92, 246, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
        }
        .animate-breath-glow {
          animation: breathGlow 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================== 1. TOP UTILITY BAR ==================== */}
      <div className={`bg-slate-950 text-slate-400 text-xs px-6 lg:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled 
          ? 'h-0 py-0 overflow-hidden opacity-0 border-none' 
          : 'h-10 py-2.5 border-b border-slate-900 opacity-100'
      }`}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-bold !text-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Systems Operational
          </span>
          <span className="h-3 w-[1px] bg-slate-800 hidden md:inline"></span>
          <span className="items-center gap-1.5 hidden md:flex font-semibold !text-slate-300">
            Secure Web Sandbox Active
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden lg:flex items-center gap-1.5 !text-slate-300 font-medium">
            Next.js Production Env
          </span>
          <a href="https://github.com/AZBrandCanada" target="_blank" rel="noopener noreferrer" className="!text-violet-400 hover:!text-violet-350 transition-colors font-black flex items-center gap-1.5">
            GitHub Hub
          </a>
        </div>
      </div>

      {/* ==================== 2. MAIN NAVIGATION CONTAINER ==================== */}
      <nav className={`w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#030712]/95 backdrop-blur-xl border-slate-900 shadow-xl py-3.5' 
          : 'bg-[#030712]/80 backdrop-blur-lg border-slate-900/40 py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-12">
            
            {/* Tech Logo Group */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="bg-violet-600 p-2.5 rounded-xl shadow-md group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                  <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tight leading-none group-hover:text-violet-400 transition-colors">
                    AZ Brand
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-violet-500 uppercase leading-none mt-1">
                    Portfolio
                  </span>
                </div>
              </Link>
            </div>

            {/* BACK TO AZBRAND ACTION (Responsive and always visible on Desktop & Mobile) */}
            <div>
              <button
                onClick={handleBackNavigation}
                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 text-white font-black px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all duration-300 animate-breath-glow hover:-translate-y-1 transform flex items-center gap-2.5 text-xs uppercase tracking-wider border border-violet-400/40 cursor-pointer"
              >
                {/* Sweeping Shimmering Highlight Overlay */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none" />
                
                {/* Back Arrow */}
                <svg className="w-4 h-4 text-white relative z-10 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

                {/* Text (Hides domain detail on small mobile to fit smaller viewports gracefully) */}
                <span className="relative z-10">
                  Back<span className="hidden sm:inline"> to azbrand.ca</span>
                </span>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}