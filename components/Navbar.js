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

  // Scroll Handler with Hysteresis to completely eliminate jitter loops
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else if (currentScrollY < 15) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* ==================== EMBEDDED CYBER-GLOW & SHIMMER KEYFRAMES ==================== */}
      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          50%, 100% { transform: translateX(150%) skewX(-25deg); }
        }
        .animate-shimmer-sweep {
          animation: shimmerSweep 3.5s infinite ease-in-out;
        }
        @keyframes cyberGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
          50% { box-shadow: 0 0 24px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
        }
        .animate-cyber-glow {
          animation: cyberGlow 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================== 1. TOP UTILITY BAR ==================== */}
      <div className={`bg-[#020204] text-zinc-400 text-[10px] font-mono px-6 lg:px-16 flex justify-between items-center transition-all duration-350 ${
        isScrolled 
          ? 'h-0 py-0 overflow-hidden opacity-0 border-none' 
          : 'h-10 py-2.5 border-b border-zinc-900/80 opacity-100'
      }`}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-bold text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse border border-emerald-400"></span>
            SYS_STATUS // OPERATIONAL
          </span>
          <span className="h-3 w-[1px] bg-zinc-850 hidden md:inline"></span>
          <span className="items-center gap-1.5 hidden md:flex font-medium text-zinc-500">
            SECURE CLIENT ENVIRONMENT ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden lg:flex items-center gap-1.5 text-zinc-500">
            ENV: NEXTJS_PROD
          </span>
          <a 
            href="https://github.com/AZBrandCanada" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-400 hover:text-white transition-colors font-bold flex items-center gap-1.5"
          >
            WORKSPACE_ROOT
          </a>
        </div>
      </div>

      {/* ==================== 2. MAIN NAVIGATION CONTAINER ==================== */}
      <nav className={`w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#020204]/95 backdrop-blur-md border-zinc-900/90 shadow-2xl py-3.5' 
          : 'bg-[#020204]/80 backdrop-blur-sm border-zinc-900/50 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center h-12">
            
            {/* Tech Logo Group */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3.5 group">
                {/* Custom Braced Icon box */}
                <div className="relative bg-zinc-950 border border-zinc-800 p-2 rounded group-hover:border-cyan-400 transition-colors duration-300">
                  <span className="absolute -top-1 -left-1 text-zinc-700 font-mono text-[9px] group-hover:text-cyan-400 transition-colors">+</span >
                  <span className="absolute -bottom-1 -right-1 text-zinc-700 font-mono text-[9px] group-hover:text-cyan-400 transition-colors">+</span >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors duration-300">
                    AZ Brand
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-violet-400 uppercase leading-none mt-1.5">
                    // PORTFOLIO_INDEX
                  </span>
                </div>
              </Link>
            </div>

            {/* BACK TO AZBRAND ACTION */}
            <div>
              <button
                onClick={handleBackNavigation}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3.5 rounded transition-all duration-300 animate-cyber-glow hover:-translate-y-0.5 flex items-center gap-2.5 border border-cyan-400/20 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                {/* Sweeping Shimmering Highlight Overlay */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none" />
                
                {/* Back Arrow */}
                <svg className="w-3.5 h-3.5 text-white relative z-10 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

                {/* Text */}
                <span className="relative z-10">
                  RETURN_TO<span className="hidden sm:inline">_AZBRAND.CA</span>
                </span>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}