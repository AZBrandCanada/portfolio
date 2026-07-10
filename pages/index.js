import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// ==================== INTERACTIVE 3D PERSPECTIVE CARD COMPONENT ====================
function ProjectCard({ project, imageCounts, onGalleryClick }) {
  const [showSpecs, setShowSpecs] = useState(false);
  const cardRef = useRef(null);
  
  // State variables tracking real-time mouse coordinate vectors for 3D physics
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reflection, setReflection] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current.getBoundingClientRect();
    const x = e.clientX - card.left; // cursor relative coordinate maps
    const y = e.clientY - card.top;
    
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    // Smooth vector rotation values
    const tiltX = -(centerY - y) / 12; 
    const tiltY = (centerX - x) / 12;

    // Reflection coordinates for the glossy cyber overlay
    const reflectX = (x / card.width) * 100;
    const reflectY = (y / card.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setReflection({ x: reflectX, y: reflectY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 }); // Smoothly restore standard equilibrium
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative bg-zinc-950/95 border flex flex-col justify-between p-6 md:p-8 hover:shadow-2xl overflow-hidden ${
        project.featured 
          ? 'border-violet-500/30 shadow-lg shadow-violet-500/5' 
          : 'border-zinc-800'
      }`}
    >
      {/* 3D Glossy reflection layer */}
      <div 
        style={{
          background: `radial-gradient(circle 250px at ${reflection.x}% ${reflection.y}%, rgba(6, 182, 212, 0.12), transparent)`,
        }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
      />

      {/* Aesthetic CAD corner brackets */}
      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-zinc-700 group-hover:border-cyan-400 transition-colors duration-300" style={{ transform: 'translateZ(15px)' }} />
      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-zinc-700 group-hover:border-cyan-400 transition-colors duration-300" style={{ transform: 'translateZ(15px)' }} />
      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-zinc-700 group-hover:border-violet-500 transition-colors duration-300" style={{ transform: 'translateZ(15px)' }} />
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-zinc-700 group-hover:border-violet-500 transition-colors duration-300" style={{ transform: 'translateZ(15px)' }} />

      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        {/* Dynamic Metadata bar */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5">
          <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            {project.subtitle}
          </span>
          {project.status ? (
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-amber-400 bg-amber-400/5 px-2.5 py-1 border border-amber-500/30 rounded">
              {project.status}
            </span>
          ) : project.featured ? (
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-violet-400 bg-violet-500/5 px-2.5 py-1 border border-violet-500/30 rounded">
              Core Stack
            </span>
          ) : null}
        </div>

        {/* High-Contrast Project Title */}
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1 mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* Detailed Description */}
        <p className="text-zinc-200 text-sm leading-relaxed mb-6 font-medium">
          {project.desc}
        </p>

        {/* Technical Architecture Specs Drawer */}
        {project.techSpecs && (
          <div className="mb-6" style={{ transform: 'translateZ(30px)' }}>
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center gap-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer select-none"
            >
              <span className={`inline-block transition-transform duration-300 font-bold ${showSpecs ? 'rotate-95 text-violet-400' : ''}`}>
                [+]
              </span>
              {showSpecs ? "Hide Compilation Architecture" : "Verify Architecture Specs"}
            </button>

            <div 
              className={`transition-all duration-300 overflow-hidden ${
                showSpecs ? 'max-h-80 mt-3 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <ul className="bg-black border border-zinc-850 p-4 space-y-2.5 font-mono text-[11px] text-zinc-300 leading-relaxed max-h-64 overflow-y-auto rounded shadow-inner">
                {project.techSpecs.map((spec, specIdx) => {
                  const parts = spec.split(':');
                  return (
                    <li key={specIdx} className="flex gap-2.5 items-start">
                      <span className="text-violet-400 font-bold flex-shrink-0">&gt;</span>
                      <span>
                        <strong className="text-white font-bold">{parts[0]}:</strong>
                        <span className="text-zinc-300">{parts.slice(1).join(':')}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Micro Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-zinc-900/80">
          {project.tags.map((tag, tagIdx) => (
            <span 
              key={tagIdx} 
              className="bg-zinc-900 text-zinc-300 text-[9px] font-mono font-bold tracking-wide px-2 py-0.5 border border-zinc-800 rounded hover:border-zinc-650 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5">
          {project.links.map((link, linkIdx) => {
            if (link.type === 'appstore') {
              return (
                <a
                  key={linkIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest py-3 transition-all duration-300 rounded shadow-md"
                >
                  <svg className="w-4 h-4 fill-current text-white animate-pulse" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.07-3.47-2.91-7.44-7.73-11.91-14.47-11.52-17.55-17.28-36.42-17.28-56.6 0-15.66 4.03-28.74 12.08-39.22 8.06-10.48 18.04-15.82 29.95-16.03 4.81 0 10.02 1.48 15.61 4.43 5.59 2.96 9.68 4.43 12.28 4.43 2.13 0 6.04-1.39 11.75-4.18 5.7-2.79 10.8-4.1 15.31-3.92 14.54.54 25.7 5.92 33.48 16.14-13.98 8.44-20.8 19.98-20.48 34.61.32 11.39 4.6 20.9 12.83 28.53 8.24 7.62 17.7 11.66 28.38 12.11-2.02 5.86-4.54 11.72-7.55 17.58zm-15.11-105.7c0-11.29 4.14-21.36 12.43-30.22 8.51-9.2 18.52-14.07 30.04-14.59.1 1.25.16 2.2.16 2.85 0 10.63-4.12 20.52-12.38 29.66-8.24 9.14-18.15 14.15-29.74 15.04-.32-1.04-.51-1.74-.51-2.74z" />
                  </svg>
                  {link.label}
                </a>
              );
            }
            
            if (link.type === 'playstore') {
              return (
                <a
                  key={linkIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest py-3 transition-all duration-300 rounded shadow-md"
                >
                  <svg className="w-4 h-4 text-white animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                  {link.label}
                </a>
              );
            }

            if (link.type === 'gallery') {
              const count = imageCounts[link.folder] || 0;
              return (
                <button
                  key={linkIdx}
                  onClick={() => onGalleryClick(link.folder)}
                  className="relative group/btn flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest py-3 transition-all duration-300 cursor-pointer rounded shadow-lg shadow-cyan-500/10 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="relative z-10">{link.label} ({count} images)</span>
                </button>
              );
            }

            return (
              <a
                key={linkIdx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors duration-200 py-2 self-start"
              >
                {link.label}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ENTRY POINT ====================
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMatrixTab, setActiveMatrixTab] = useState('frontend');
  const [mounted, setMounted] = useState(false);

  // Dynamic image states
  const [landgrafImages, setLandgrafImages] = useState([]);
  const [ecobelleImages, setEcobelleImages] = useState([]);
  const [anxietyGuyImages, setAnxietyGuyImages] = useState([]);
  
  // Gallery Lightbox states
  const [activeGallery, setActiveGallery] = useState(null); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Next.js Telemetry Control States
  const [edgeLatency, setEdgeLatency] = useState(14);
  const [renderingMode, setRenderingMode] = useState('SSR');
  const [isrStatus, setIsrStatus] = useState('FRESH_STATE');

  useEffect(() => {
    setMounted(true);
    
    const fetchFolderImages = async () => {
      try {
        const resLandgraf = await fetch('/api/images?folder=landgraf');
        if (resLandgraf.ok) {
          const data = await resLandgraf.json();
          setLandgrafImages(data);
        }
        
        const resEcobelle = await fetch('/api/images?folder=ecobelle');
        if (resEcobelle.ok) {
          const data = await resEcobelle.json();
          setEcobelleImages(data);
        }

        const resAnxietyGuy = await fetch('/api/images?folder=anxietyguy');
        if (resAnxietyGuy.ok) {
          const data = await resAnxietyGuy.json();
          setAnxietyGuyImages(data);
        }
      } catch (err) {
        console.error("Failed to fetch folder images dynamically:", err);
      }
    };

    fetchFolderImages();
  }, []);

  // Keyboard navigation for open modal
  useEffect(() => {
    if (!activeGallery) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGallery, currentImageIndex, landgrafImages, ecobelleImages, anxietyGuyImages]);

  const openGallery = (folder) => {
    setActiveGallery(folder);
    setCurrentImageIndex(0);
    setIsZoomed(false);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setIsZoomed(false);
  };

  const getActiveImages = () => {
    if (activeGallery === 'landgraf') return landgrafImages;
    if (activeGallery === 'ecobelle') return ecobelleImages;
    if (activeGallery === 'anxietyguy') return anxietyGuyImages;
    return [];
  };

  const nextImage = () => {
    const images = getActiveImages();
    if (images.length === 0) return;
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getActiveImages();
    if (images.length === 0) return;
    setIsZoomed(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const triggerIsrRevalidation = () => {
    setIsrStatus('REVALIDATING...');
    setTimeout(() => {
      setIsrStatus('CACHE_UPDATED (200 OK)');
      setTimeout(() => setIsrStatus('STALE_WHILE_REVALIDATE'), 2000);
    }, 1200);
  };

  const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'rust', label: 'Rust Core' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'wordpress', label: 'WordPress' },
    { id: 'mobile', label: 'Mobile Platforms' },
    { id: 'node_express', label: 'Node Express' },
  ];

  const techMatrix = {
    frontend: {
      index: "01",
      title: "Client-Side Engineering",
      desc: "Performance-first frontend clients built with advanced rendering architectures.",
      skills: ["Next.js 14/15 (App & Pages Router)", "React Concurrent Features", "Tailwind CSS & CSS Modules", "Server-Side Rendering (SSR)", "Static Site Generation (SSG)"]
    },
    backend: {
      index: "02",
      title: "Data & Systems Infrastructure",
      desc: "Robust state management, authentication configurations, and backend automation.",
      skills: ["Supabase Integration", "PostgreSQL Database Design", "Row Level Security (RLS)", "REST & GraphQL APIs", "Serverless Functions"]
    },
    mobile: {
      index: "03",
      title: "Cross-Platform Mobile",
      desc: "Native-quality application builds optimized for quick market deployment.",
      skills: ["Flutter Core Framework", "Dart OOP Principles", "App Store Connect Pipelines", "Google Play Console Pipelines", "Local Storage & State Audits"]
    },
    cms: {
      index: "04",
      title: "CMS & High-Traffic Sites",
      desc: "Custom-configured content engines with dynamic asset-loading optimization.",
      skills: ["WordPress Core Optimization", "Custom Theme & Block Development", "High-Performance Caching & CDNs", "SEO & Core Web Vitals Auditing", "Automated Media Syndication"]
    }
  };

  const projects = [
    {
      title: "Teenovation",
      subtitle: "Enterprise Startup System",
      desc: "A scalable ecosystem integrating a Next.js web application, native iOS & Android clients built in Flutter, and a unified Supabase cloud database backend. Transactions are routed via custom Next.js APIs on Cloudflare Pages supporting custom payment setups. Includes a secure legacy Wix API dual-payment integration to facilitate continuous user migration. Maintained under an active client retainer contract.",
      tags: ["Next.js", "Flutter", "Supabase", "Cloudflare Pages", "PostgreSQL", "Retainer Production Client"],
      category: "mobile",
      links: [
        { type: 'web', label: "Launch Web", url: "https://teenovation.net" },
        { type: 'appstore', label: "App Store", url: "https://apps.apple.com/ca/app/teenovation/id6720759653" },
        { type: 'playstore', label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.teenovationhub.teenovation&hl=en-US" }
      ],
      featured: true,
      techSpecs: [
        "Client Engine: Next.js frontend utilizing concurrent pre-rendering and dynamic component hydration on Vercel.",
        "Mobile App: Cross-platform Dart native compiling via Flutter Engine for iOS and Android.",
        "Custom APIs: Cloudflare Pages / Workers API runtime hosting secure payment pipelines alongside a legacy Wix API dual-payment database synchronization model.",
        "Operational Status: Actively managed production system supported under an ongoing maintenance and engineering retainer."
      ]
    },
    {
      title: "ForgePress",
      subtitle: "Custom-Built Site Core Engine",
      desc: "An open-source custom-built alternative to WordPress. Architected to support lightweight dynamic data rendering, modular content structuring, and custom database schemas. Active repository in development.",
      tags: ["Rust Systems", "Alternative Engine", "Architecture Core", "Alpha Release"],
      category: "rust",
      links: [
        { type: 'web', label: "ForgePress GitHub", url: "https://github.com/AZBrandCanada/ForgePress" }
      ],
      featured: true,
      status: "Open Source Alpha",
      techSpecs: [
        "Server Core: Asynchronous axum v0.7 web runtime powered by tokio background task scheduling.",
        "Plugin Sandbox: WebAssembly Guest Component execution via wasmtime using WIT interface contracts and WASI Preview 2.",
        "Inline Scripting: Safe embedded scripting runtime using Rhai bindings to filter event hooks dynamically.",
        "Data Paradigm: Decoupled flat database access leveraging atomic PostgreSQL JSONB block arrays to eliminate N+1 relational query loops.",
        "Template Engine: Safe MiniJinja parsing written with Pinned, Boxed async futures to resolve recursive stack layout compilation limits."
      ]
    },
    {
      title: "The Anxiety Guy App",
      subtitle: "Client Vault Mobile Application",
      desc: "The mobile equivalent of the Member Vault platform. A cross-platform Flutter application providing secure offline guide streaming and data sync using Supabase. Utilizes custom APIs powered by Next.js and Cloudflare Pages/Workers APIs for specialized app transactions and custom payment structures. Maintained under an active client retainer contract.",
      tags: ["Flutter", "Supabase", "Mobile App", "Cloudflare Workers", "Custom APIs", "Retainer Production Client"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View App Screenshots", folder: "anxietyguy" }
      ],
      featured: true,
      status: "In Development",
      techSpecs: [
        "Mobile Client: Cross-platform Flutter engine optimized for low-latency media playback and state handling.",
        "Payment Architecture: Custom transactional backend constructed using Next.js route handlers and serverless Cloudflare Workers APIs.",
        "Offline Sync: Local database caching with Supabase remote persistence to keep user recovery milestones synchronized.",
        "Operational Status: Active product deployment maintained under an ongoing engineering retainer."
      ]
    },
    {
      title: "Landgraf Lawn Care - Internal Booking System",
      subtitle: "Proprietary Dispatch & Booking App",
      desc: "An internal scheduling and technician dispatch engine coordination tool linking a Flutter technician client, a Next.js administrative console, and a Supabase real-time sync system. Secure field transactions are powered by custom Next.js APIs running on Cloudflare Pages for instant deposit capturing. Maintained under an active client retainer contract.",
      tags: ["Flutter", "Next.js", "Supabase", "Cloudflare Pages", "Internal Tool", "Retainer Production Client"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View System Screenshots", folder: "landgraf" }
      ],
      featured: true,
      techSpecs: [
        "Technician app: Cross-platform Flutter binary coordinating live scheduling coordinates and field job completion trees.",
        "Transaction Pipelines: Dedicated payment handlers deploying Cloudflare Pages/Workers APIs and Next.js server routines.",
        "Console Hub: Administrative web console utilizing Next.js for rapid geo-location dispatch maps and employee assignments.",
        "Operational Status: Mission-critical enterprise utility managed under a rolling client retainer agreement."
      ]
    },
    {
      title: "Ecobelle - Mobile Booking & CMS App",
      subtitle: "Client & Scheduling Interface",
      desc: "A custom Flutter mobile client providing direct residential service booking, calendar coordination, and dynamic CMS content delivery. Features custom booking checkout structures operating on Cloudflare Pages and Next.js custom APIs to process scheduling reservations. Maintained under an active client retainer contract.",
      tags: ["Flutter", "Next.js", "Supabase", "Cloudflare Pages", "Client Portals", "Retainer Production Client"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View App Screenshots", folder: "ecobelle" }
      ],
      featured: false,
      techSpecs: [
        "Client App: Flutter GUI integrating clean step-by-step service customizer widgets.",
        "Sync Architecture: Instant backend CMS state distribution from Next.js server actions straight to mobile clients.",
        "Deposit Interface: Cloudflare Pages payment APIs communicating structured deposit parameters to Next.js route handlers.",
        "Operational Status: Active client platform supported under a rolling monthly maintenance retainer."
      ]
    },
    {
      title: "The Anxiety Guy - Member Vault",
      subtitle: "Secure Client Program Portal",
      desc: "A highly secure, specialized program delivery backend built to handle user access permissions, encrypted content streams, and membership recovery data for premium training materials. Based on Node Express",
      tags: ["Membership Backend", "Secure Content Delivery", "Node Express", "User Authentication"],
      category: "Node Express",
      links: [
        { type: 'web', label: "Launch Member Vault", url: "https://vault.theanxietyguy.com/" }
      ],
      featured: true,
      techSpecs: [
        "App Stack: Node.js Express server utilizing modular dynamic token authentication.",
        "Access Protection: Dynamic custom integrations tracking product purchases across distinct external eCommerce sites.",
        "System Delivery: High-bandwidth file encryption safeguarding proprietary therapy video modules and digital PDF worksheets."
      ]
    },
    {
      title: "Wades Burgers",
      subtitle: "High-Performance Web Client",
      desc: "A highly performant, conversion-focused landing and menu delivery site utilizing Next.js static generation.",
      tags: ["Next.js", "Tailwind CSS", "Static Site Gen", "Optimized SEO"],
      category: "nextjs",
      links: [
        { type: 'web', label: "Launch Website", url: "https://www.wadesburgers.ca/" }
      ],
      featured: false,
    },
    {
      title: "HandyHeroYYC",
      subtitle: "On-Demand Service Directory",
      desc: "A responsive utility portal implementing customized desktop mega-menus, structured client lead pathways, and optimized deployment via Vercel Edge networks.",
      tags: ["Next.js", "Tailwind CSS", "Interactive Components", "Vercel Edge"],
      category: "nextjs",
      links: [
        { type: 'web', label: "Launch Website", url: "https://handyheroyyc.vercel.app/" }
      ],
      featured: false,
    },
    {
      title: "Ecobelle Cleaning Services",
      subtitle: "SaaS & Scheduling Layout",
      desc: "Eco-friendly commercial cleaning landing pages and scheduling layouts crafted for conversions and SEO ranking.",
      tags: ["Next.js", "UI/UX Design", "Component Library"],
      category: "nextjs",
      links: [
        { type: 'web', label: "Launch Website", url: "https://ecobelle-cleaning-services.com/" }
      ],
      featured: false,
    },
    {
      title: "Herbs with Robyn",
      subtitle: "Direct-to-Consumer Portal",
      desc: "Fast, content-forward informational site focused on health consultation intake and optimized page load structures.",
      tags: ["Next.js", "React Hooks", "Responsive Layout"],
      category: "nextjs",
      links: [
        { type: 'web', label: "Launch Website", url: "https://herbswithrobyn.com" }
      ],
      featured: false,
    },
    {
      title: "The Anxiety Guy",
      subtitle: "High-Traffic Content Hub",
      desc: "A sprawling coaching and media directory integrating massive podcast syndication, blogs, and automated product marketing funnels.",
      tags: ["WordPress", "Custom Themes", "Podcast Integration", "Marketing Automation"],
      category: "wordpress",
      links: [
        { type: 'web', label: "Launch Website", url: "https://theanxietyguy.com" }
      ],
      featured: true,
    },
    {
      title: "Dennis Simsek",
      subtitle: "Personal Brand & Media Hub",
      desc: "A fast, scalable personal branding space designed to handle heavy user traffic, newsletters, and digital product distribution.",
      tags: ["WordPress", "SEO Optimization", "Lead Funnels", "Performance Auditing"],
      category: "wordpress",
      links: [
        { type: 'web', label: "Launch Website", url: "https://dennissimsek.com/" }
      ],
      featured: false,
    },
    {
      title: "Nomad Surfers",
      subtitle: "Global Travel & Directory",
      desc: "An international surf destination directory managing vast visual libraries, dynamic filters, and booking flow infrastructures. Manual Theme builds, manual legacy plugin upgrades, security upgrades. Initial service included malware removal and immediate hacker removal.",
      tags: ["WordPress", "Directory Architecture", "Visual Catalogs", "Global CDN"],
      category: "wordpress",
      links: [
        { type: 'web', label: "Launch Website", url: "https://nomadsurfers.com" }
      ],
      featured: false,
    },
    {
      title: "Landgraf Lawn Care",
      subtitle: "Local Service Platform",
      desc: "A clean service showcase layout crafted to convert local organic search traffic into active customer leads.",
      tags: ["WordPress", "Local SEO", "Contact API", "Mobile First"],
      category: "wordpress",
      links: [
        { type: 'web', label: "Launch Website", url: "https://landgraflawncare.ca" }
      ],
      featured: false,
    },
    {
      title: "Be Green Lawn Care",
      subtitle: "Eco-Service Portal",
      desc: "A visually engaging organic service marketing application designed for regional coverage and lead acquisition.",
      tags: ["WordPress", "Lead Gen", "Geo-Targeted Content", "Asset Compression"],
      category: "wordpress",
      links: [
        { type: 'web', label: "Launch Website", url: "https://begreenlawncare.ca" }
      ],
      featured: false,
    }
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'rust') return project.category === 'rust';
    if (activeFilter === 'nextjs') return project.category === 'nextjs' || project.title === 'Teenovation';
    if (activeFilter === 'wordpress') return project.category === 'wordpress';
    if (activeFilter === 'mobile') return project.category === 'mobile';
    if (activeFilter === 'node_express') return project.category === 'Node Express';
    return true;
  });

  return (
    <>
      <Head>
        <title>Portfolio | AZ Brand Canada - Advanced Web & App Engineering</title>
        <meta name="description" content="Technical portfolio showing production deployments of Next.js web applications, Flutter mobile apps, and custom high-traffic WordPress platforms." />
      </Head>

      <style>{`
        /* --- Cyberpunk Grid & scanline effects --- */
        @keyframes gridTravel {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes terminalCursor {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes floating3D {
          0%, 100% { transform: translateY(0px) rotateX(20deg) rotateY(-15deg); }
          50% { transform: translateY(-12px) rotateX(15deg) rotateY(-20deg); }
        }
        .cyber-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
          animation: gridTravel 12s linear infinite;
        }
        .scanline-element {
          animation: scanline 8s linear infinite;
          background: linear-gradient(to bottom, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(6, 182, 212, 0) 100%);
        }
        .blinking-terminal::after {
          content: '█';
          animation: terminalCursor 1s steps(2, start) infinite;
          margin-left: 4px;
          color: #06b6d4;
        }
        .perspective-deck {
          perspective: 1200px;
        }
        .floating-matrix-3d {
          transform-style: preserve-3d;
          animation: floating3D 6s ease-in-out infinite;
        }

        /* --- Complete custom removal of native scrollbar indicators --- */
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <div className="min-h-screen bg-[#020204] text-zinc-100 relative overflow-x-hidden">
        
        {/* ==================== CYBERSCAN & ACTIVE GRID BACKGROUNDS ==================== */}
        <div className="absolute inset-0 cyber-grid pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full scanline-element pointer-events-none" />
        
        {/* Subtle ambient lighting fields (refined) */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Structural aesthetic vertical border guidelines */}
        <div className="absolute top-0 left-6 bottom-0 w-[1px] bg-zinc-900/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 right-6 bottom-0 w-[1px] bg-zinc-900/40 pointer-events-none hidden lg:block" />

        {/* ==================== NAVIGATION / STATUS BAR ==================== */}
        <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-wider text-white">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-emerald-400" />
              <span>AZBRAND.CA // SECURE NODE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-zinc-500">
              <span className="text-zinc-400">SYS_LATENCY: {edgeLatency}ms</span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-400 font-bold">REPOS: VERIFIED</span>
            </div>
          </div>
        </nav>

        {/* ==================== HERO HEADER SECTION WITH 3D PLATFORMS ==================== */}
        <header className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-zinc-900 pb-16">
            
            {/* Left Column: Mission Control & Objective Statement */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-800/40 rounded mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-300 font-bold">CLIENT DEPLOYMENT MANIFEST</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black text-white tracking-tight leading-none mb-6">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Robust Dynamic</span> Architectures.
              </h1>
              
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal mb-8">
                Dedicated system layouts constructed on performant compiler runtimes and reactive architectures. Private source files are coordinates-mapped within secure, restricted workspaces over our main repository on{' '}
                <a 
                  href="https://github.com/AZBrandCanada" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-cyan-400 font-black underline decoration-cyan-400/50 decoration-2 transition-all"
                >
                  GitHub Workspace
                </a>.
              </p>

             </div>

            {/* Right Column: Floating 3D Iso-structural Terminal */}
            <div className="lg:col-span-5 flex justify-center perspective-deck">
              <div className="relative w-full max-w-sm aspect-square bg-zinc-950/20 rounded border border-zinc-900 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
                
                {/* Simulated 3D isometric floating block */}
                <div className="w-64 h-64 relative floating-matrix-3d flex flex-col justify-between bg-zinc-950 border-2 border-cyan-400/40 p-6 shadow-3xl shadow-cyan-400/5">
                  {/* Glossy line shine */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                  
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                      <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-full" />
                      <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full" />
                    </div>
                    <span className="font-mono text-[8px] text-zinc-500 tracking-wider font-black">PERSPECTIVE_ENGINE_V1</span>
                  </div>

                  {/* Wireframe isometric data stack inside the card */}
                  <div className="my-4 space-y-2 flex-1 flex flex-col justify-center">
                    <div className="h-2 bg-cyan-400/20 border border-cyan-400/30 rounded w-11/12 animate-pulse" />
                    <div className="h-2 bg-violet-400/10 border border-violet-400/20 rounded w-4/5" />
                    <div className="h-2 bg-zinc-900 border border-zinc-800 rounded w-5/6" />
                    <div className="h-2 bg-zinc-900 border border-zinc-800 rounded w-2/3" />
                  </div>

                  <div className="border-t border-zinc-900 pt-3 flex justify-between items-center font-mono text-[9px] text-zinc-400">
                    <span>3D_MATRIX: ACTIVE</span>
                    <span className="text-cyan-400 font-bold">Tilt Cursor Over Cards Below</span>
                  </div>
                </div>

                {/* Sub-layers of depth representing multi-threaded runtime loops */}
                <div className="absolute w-56 h-56 border border-violet-500/10 rounded pointer-events-none floating-matrix-3d opacity-60 translate-z-[-50px]" style={{ transform: 'rotateX(20deg) rotateY(-15deg) translateZ(-60px)' }} />
                <div className="absolute w-48 h-48 border border-cyan-500/5 rounded pointer-events-none floating-matrix-3d opacity-30 translate-z-[-100px]" style={{ transform: 'rotateX(20deg) rotateY(-15deg) translateZ(-120px)' }} />
              </div>
            </div>

          </div>
        </header>

        {/* ==================== PORTFOLIO INTERACTIVE WORKSPACE ==================== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-28">
          
          {/* File Explorer Style Category Filtering Bar (Pruned to resolve layout shifting vertical scroll bars) */}
          <div className="flex flex-row overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-zinc-850 mb-10 hide-scrollbar w-full">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-4.5 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 border-t border-r cursor-pointer flex-shrink-0 ${
                  activeFilter === cat.id
                    ? 'bg-zinc-950 text-cyan-400 border-t-2 border-t-cyan-400 border-x-zinc-850'
                    : 'bg-transparent border-t-transparent border-r-zinc-850 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950/20'
                }`}
                style={{ marginBottom: '-1px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Display Grid with mouse-tilt operations enabled */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mounted && filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={idx}
                project={project}
                imageCounts={{
                  landgraf: landgrafImages.length,
                  ecobelle: ecobelleImages.length,
                  anxietyguy: anxietyGuyImages.length
                }}
                onGalleryClick={openGallery}
              />
            ))}
          </div>
        </section>

        {/* ==================== SCREENSHOT GALLERY LIGHTBOX MODAL ==================== */}
        {activeGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity">
            <div className="absolute inset-0 cursor-pointer" onClick={closeGallery} />
            
            <div className="relative w-full max-w-4xl px-4 flex flex-col items-center h-[90vh] justify-between z-10">
              
              {/* Modal Metadata Top Bar */}
              <div className="w-full flex justify-between items-center border-b border-zinc-850 pb-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-black uppercase tracking-widest text-cyan-400">
                    MANIFEST_PREVIEW: {activeGallery}.pkg
                  </span>
                  {getActiveImages().length > 0 && (
                    <span className="text-[10px] text-zinc-400 font-mono mt-1">
                      Frame {currentImageIndex + 1} of {getActiveImages().length} • Single click triggers adaptive zooming
                    </span>
                  )}
                </div>
                <button 
                  onClick={closeGallery}
                  className="px-4 py-2 text-xs font-mono font-black uppercase tracking-widest border border-zinc-800 bg-zinc-900 rounded text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                >
                  CLOSE_STREAM (ESC)
                </button>
              </div>

              {/* Flex-grow container: Lightbox Viewport */}
              <div 
                className={`relative w-full flex-1 flex items-center justify-center bg-black/50 border border-zinc-900 rounded ${
                  isZoomed ? 'overflow-auto touch-pan-x touch-pan-y' : 'overflow-hidden'
                }`}
                style={{ maxHeight: '70vh' }}
              >
                {getActiveImages().length > 0 ? (
                  <img 
                    src={getActiveImages()[currentImageIndex]} 
                    alt={`Specimen screen ${currentImageIndex}`} 
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`transition-all duration-300 object-contain select-none rounded shadow-2xl ${
                      isZoomed 
                        ? 'max-h-none max-w-none w-[170%] cursor-zoom-out py-8' 
                        : 'max-h-[66vh] max-w-full cursor-zoom-in'
                    }`}
                  />
                ) : (
                  // Empty State fallback instructions
                  <div className="text-center p-8 font-mono">
                    <svg className="w-10 h-10 text-zinc-800 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <h4 className="text-sm font-bold text-zinc-300 mb-1">NO SCREENSHOT SPECIMENS DETECTED</h4>
                    <p className="text-[10px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
                      Place high-resolution screenshots in: <code className="text-cyan-400">/public/{activeGallery}/</code> to enable dynamic slide rendering.
                    </p>
                  </div>
                )}
              </div>

              {/* Prev / Next controls and Dynamic Scaling status */}
              <div className="w-full flex justify-between items-center border-t border-zinc-900 pt-4 mt-4 pb-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                    isZoomed 
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' 
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {isZoomed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9V4.5M15 9h4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                    )}
                  </svg>
                  {isZoomed ? "SCALE: active (DRAG TO PAN)" : "SCALE: static (CLICK TO ZOOM)"}
                </button>

                {getActiveImages().length > 1 && (
                  <div className="flex gap-2 font-mono">
                    <button 
                      onClick={prevImage}
                      className="px-4 py-2 border border-zinc-800 hover:border-cyan-400 bg-zinc-900 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs"
                      aria-label="Previous image"
                    >
                      &lt; PREVIOUS
                    </button>
                    <button 
                      onClick={nextImage}
                      className="px-4 py-2 border border-zinc-800 hover:border-cyan-400 bg-zinc-900 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs"
                      aria-label="Next image"
                    >
                      NEXT &gt;
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== FOOTER SECTION ==================== */}
        <footer className="border-t border-zinc-900 bg-black/80 relative z-10 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-mono text-[10px] text-zinc-600">
              © 2026 AZ Brand Canada // Advanced Systems Operations
            </span>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/AZBrandCanada" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[10px] text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                WORKSPACE_ROOT
              </a>
              <span className="h-3 w-[1px] bg-zinc-900" />
              <a 
                href="https://azbrand.ca" 
                className="font-mono text-[10px] text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                PARENT_SITE
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}