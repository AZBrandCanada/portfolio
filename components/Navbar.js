import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state
  const [servicesOpen, setServicesOpen] = useState(false); // Desktop Mega-Menu state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // Mobile accordion state
  const [isScrolled, setIsScrolled] = useState(false); // Scroll detection
  const dropdownRef = useRef(null);

  // Expanded services lists for a highly structured 2x3 Mega-Menu grid
  const homeServices = [
    {
      title: "General Contracting",
      desc: "Full project management, basement development, and framing.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M2.25 21h19.5M3 10l9-7 9 7M10.5 8.25h3" />
        </svg>
      )
    },
    {
      title: "Home Renovations",
      desc: "Kitchen remodeling, bath upgrades, and interior conversions.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.5 1.5 0 0020 18.75l-5.83-5.83m-2.75 2.25l-2.5 2.5m10-10L14 3.75a1.5 1.5 0 00-2.25 0L3.75 11.42a1.5 1.5 0 000 2.25L11.42 21M13.5 6.75L17.25 10.5M10.5 13.5l-3.75-3.75" />
        </svg>
      )
    },
    {
      title: "Hauling & Demolition",
      desc: "Fast junk removal, site preparations, and garage teardowns.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.318-5.185a1.5 1.5 0 00-1.493-1.408h-2.115a1.5 1.5 0 00-1.314.768L14.25 14.25m6.3 4.5H14.25m0 0V11.25M6.75 14.25h7.5" />
        </svg>
      )
    },
    {
      title: "Landscaping & Fences",
      desc: "Decks, custom wood fencing, yard cleanups, and grading.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M6.34 6.34l11.32 11.32M6.34 17.66L17.66 6.34" />
        </svg>
      )
    },
    {
      title: "Drywall & Handyman",
      desc: "Patching, wall repairs, texture matching, and painting services.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      )
    },
    {
      title: "Commercial Contracting",
      desc: "Office maintenance, installations, retail updates, & specialty repairs.",
      href: "/services",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 3.75h.75m-.75 3h.75m-.75 3h.75M18 6.75h.75m-.75 3h.75M18 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      )
    }
  ];

  // Dynamic Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 32px rgba(245, 158, 11, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.5); }
        }
        .animate-breath-glow {
          animation: breathGlow 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================== 1. TOP UTILITY BAR ==================== */}
      <div className={`bg-slate-950 text-slate-300 text-xs px-6 lg:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled 
          ? 'h-0 py-0 overflow-hidden opacity-0 border-none' 
          : 'h-10 py-2.5 border-b border-slate-900 opacity-100'
      }`}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-bold !text-slate-100">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12Z" />
            </svg>
            Fully Insured & Bonded
          </span>
          <span className="h-3 w-[1px] bg-slate-800 hidden md:inline"></span>
          <span className="items-center gap-1.5 hidden md:flex font-bold !text-slate-100">
            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            ★ 5.0 Google Rating (48 Reviews)
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden lg:flex items-center gap-1.5 !text-slate-300 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Calgary Office: Mon-Sat 8AM-6PM
          </span>
          <a href="tel:+15874290027" className="!text-amber-400 hover:!text-amber-300 transition-colors font-black flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.115-.44.05-.927.438-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            +1 (587) 429-0027
          </a>
        </div>
      </div>

      {/* ==================== 2. MAIN NAVIGATION CONTAINER ==================== */}
      <nav className={`w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl border-slate-900 shadow-xl py-3.5' 
          : 'bg-slate-950/80 backdrop-blur-lg border-slate-900/40 py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-12">
            
            {/* Logo Group */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="bg-amber-500 p-2.5 rounded-xl shadow-md group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                  <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M2.25 21h19.5M3 10l9-7 9 7M10.5 8.25h3" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                    HandyHero
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase leading-none mt-1">
                    Calgary & Area
                  </span>
                </div>
                <span className="bg-amber-500/10 text-amber-500 text-[10px] px-2.5 py-0.5 rounded-md font-black uppercase tracking-wider hidden sm:inline-block border border-amber-500/20">
                  YYC
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-10">
              
              <Link href="/" className="!text-slate-100 hover:!text-amber-400 font-extrabold tracking-wide py-2 transition-colors duration-200 relative group text-sm">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Mega-Menu Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 !text-slate-100 hover:!text-amber-400 font-extrabold tracking-wide py-2 transition-colors duration-200 text-sm cursor-pointer"
                >
                  Services
                  <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${servicesOpen ? 'rotate-180 !text-amber-500' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Mega-Menu Overlay */}
                {servicesOpen && (
                  <div 
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-fadeIn"
                  >
                    <div className="col-span-2 border-b border-slate-850 pb-3 mb-1">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-500">Professional Services</span>
                    </div>
                    {homeServices.map((service, index) => (
                      <Link 
                        key={index} 
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex gap-4 p-3 rounded-xl hover:bg-slate-850/90 transition-colors group/item border border-transparent hover:border-slate-800"
                      >
                        <div className="bg-slate-850 p-2.5 rounded-xl h-fit group-hover/item:bg-amber-500/10 group-hover/item:text-amber-400 transition-colors">
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-black !text-white group-hover/item:text-amber-400 transition-colors leading-none mb-1">
                            {service.title}
                          </h4>
                          <p className="text-xs !text-slate-300 mt-1 leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 bg-slate-950/60 p-3.5 rounded-xl flex justify-between items-center border border-slate-800/40 mt-1">
                      <span className="text-xs !text-slate-300">Need a custom residential contractor build?</span>
                      <Link href="/contact" onClick={() => setServicesOpen(false)} className="text-xs !text-amber-400 font-extrabold hover:underline flex items-center gap-1">
                        View All Services
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/contact" className="!text-slate-100 hover:!text-amber-400 font-extrabold tracking-wide py-2 transition-colors duration-200 relative group text-sm">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* ==================== DESKTOP PHONE NUMBER ACCENT BADGE ==================== */}
              <a href="tel:+15874290027" className="hidden lg:flex flex-col text-right group pr-2">
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Direct Dispatch</span>
                <span className="text-sm font-black !text-slate-100 group-hover:!text-amber-400 transition-colors tracking-wide">
                  +1 (587) 429-0027
                </span>
              </a>

              {/* "VERY SPECIAL" CTA BUTTON */}
              <Link
                href="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black px-7 py-3.5 rounded-xl transition-all duration-300 animate-breath-glow hover:-translate-y-1 transform flex items-center gap-2.5 text-xs uppercase tracking-wider border border-amber-300/40"
              >
                {/* Sweeping Shimmering Highlight Overlay */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none" />
                
                {/* Text */}
                <span className="relative z-10">Get a Free Quote</span>
                
                {/* Slider Arrow */}
                <svg className="w-4 h-4 text-slate-950 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

            </div>

            {/* Mobile Interaction Group (Call Icon + Menu Button) */}
            <div className="md:hidden flex items-center gap-2">
              
              {/* ==================== QUICK PHONE CALL ACCENT ON MOBILE ==================== */}
              <a
                href="tel:+15874290027"
                className="text-amber-500 hover:text-amber-400 p-2.5 bg-slate-900 border border-slate-800 rounded-xl transition-all shadow-md"
                aria-label="Call HandyHero Direct"
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.115-.44.05-.927.438-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </a>

              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl transition-all border border-slate-800"
                aria-label="Open navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ==================== 3. MOBILE SLIDE-OUT DRAWER ==================== */}
      {/* Backdrop blur */}
      <div 
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-slate-950 border-l border-slate-900 shadow-2xl z-50 p-6 flex flex-col justify-between transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div>
          <div className="flex justify-between items-center border-b border-slate-900 pb-5 mb-6">
            <span className="text-md font-black tracking-tight text-white flex items-center gap-2">
              <div className="bg-amber-500 p-1.5 rounded-lg">
                <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              HandyHero
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-450 hover:text-white hover:bg-slate-900 rounded-xl transition-colors border border-slate-900"
              aria-label="Close menu"
            >
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-md font-black !text-slate-200 hover:bg-slate-900 hover:!text-white transition-all"
            >
              Home
            </Link>

            {/* Mobile Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex justify-between items-center w-full px-4 py-3 rounded-xl text-md font-black !text-slate-200 hover:bg-slate-900 hover:!text-white transition-all"
              >
                <span>Services</span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform ${mobileServicesOpen ? 'rotate-180 text-amber-500' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 mt-1 space-y-1 bg-slate-950/40 border-l border-slate-900 ml-4">
                  {homeServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="block px-4 py-2 rounded-lg text-sm font-bold !text-slate-400 hover:!text-amber-500 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-md font-black !text-slate-200 hover:bg-slate-900 hover:!text-white transition-all"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Drawer Quick Actions */}
        <div className="border-t border-slate-900 pt-6 space-y-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-2">Service Area Status</span>
            <div className="flex items-center gap-2 text-sm !text-white font-black">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Dispatching in Calgary & Area
            </div>
          </div>

          <a
            href="tel:+15874290027"
            className="flex justify-center items-center gap-2.5 w-full border border-slate-800 !text-white py-4 rounded-xl font-black text-sm bg-slate-900 hover:bg-slate-855 transition-colors"
          >
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.115-.44.05-.927.438-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Call +1 (587) 429-0027
          </a>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full bg-amber-500 hover:bg-amber-600 !text-slate-950 py-4 rounded-xl font-black transition-all text-sm uppercase tracking-wider"
          >
            Request Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}