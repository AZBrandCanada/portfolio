import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMatrixTab, setActiveMatrixTab] = useState('frontend');
  const [mounted, setMounted] = useState(false);

  // Dynamic image tracking states
  const [landgrafImages, setLandgrafImages] = useState([]);
  const [ecobelleImages, setEcobelleImages] = useState([]);
  const [anxietyGuyImages, setAnxietyGuyImages] = useState([]);
  
  // Gallery modal states
  const [activeGallery, setActiveGallery] = useState(null); // 'landgraf' | 'ecobelle' | 'anxietyguy' | null
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // Zoom pane tracking state

  useEffect(() => {
    setMounted(true);
    
    // Retrieves asset list from filesystem scanning API
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

  // Keyboard navigation controller for the open gallery modal
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
    setIsZoomed(false); // Reset magnification when transitioning
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getActiveImages();
    if (images.length === 0) return;
    setIsZoomed(false); // Reset magnification when transitioning
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'nextjs', label: 'Next.js Apps' },
    { id: 'wordpress', label: 'WordPress Engine' },
    { id: 'mobile', label: 'Mobile Platforms' },
    { id: 'node_express', label: 'Node Express' },
  ];

  // Tech matrix definitions for client review
  const techMatrix = {
    frontend: {
      title: "Client-Side Engineering",
      desc: "Performance-first frontend clients built with advanced rendering architectures.",
      skills: ["Next.js 14/15 (App & Pages Router)", "React Concurrent Features", "Tailwind CSS & CSS Modules", "Server-Side Rendering (SSR)", "Static Site Generation (SSG)"]
    },
    backend: {
      title: "Data & Systems Infrastructure",
      desc: "Robust state management, authentication configurations, and backend automation.",
      skills: ["Supabase Integration", "PostgreSQL Database Design", "Row Level Security (RLS)", "REST & GraphQL APIs", "Serverless Functions"]
    },
    mobile: {
      title: "Cross-Platform Mobile",
      desc: "Native-quality application builds optimized for quick market deployment.",
      skills: ["Flutter Core Framework", "Dart OOP Principles", "App Store Connect Pipelines", "Google Play Console Pipelines", "Local Storage & State Audits"]
    },
    cms: {
      title: "CMS & High-Traffic Sites",
      desc: "Custom-configured content engines with dynamic asset-loading optimization.",
      skills: ["WordPress Core Optimization", "Custom Theme & Block Development", "High-Performance Caching & CDNs", "SEO & Core Web Vitals Auditing", "Automated Media Syndication"]
    }
  };

  const projects = [
    {
      title: "Teenovation",
      subtitle: "Enterprise Startup System",
      desc: "A scalable platform comprising a Next.js web ecosystem, native iOS & Android applications written in Flutter, and a unified Supabase cloud database backend. Customer Migration and legacy support with dual payment systems.",
      tags: ["Next.js", "Flutter", "Supabase", "iOS & Android", "PostgreSQL"],
      category: "mobile",
      links: [
        { type: 'web', label: "Launch Web", url: "https://teenovation.net" },
        { type: 'appstore', label: "App Store", url: "https://apps.apple.com/ca/app/teenovation/id6720759653" },
        { type: 'playstore', label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.teenovationhub.teenovation&hl=en-US" }
      ],
      featured: true,
    },
    {
      title: "The Anxiety Guy App",
      subtitle: "Client Vault Mobile Application",
      desc: "The mobile equivalent of the Member Vault platform. A cross-platform Flutter application allowing clients to access purchased programs offline, stream structured audio guides, and interact with Supabase secure real-time syncing pipelines.",
      tags: ["Flutter", "Supabase", "Mobile App", "Audio Syncing", "State Architecture"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View App Screenshots", folder: "anxietyguy" }
      ],
      featured: true,
      status: "In Development"
    },
    {
      title: "Landgraf Lawn Care - Internal Booking System",
      subtitle: "Proprietary Dispatch & Booking App",
      desc: "An internal scheduling and technician dispatch engine coordination tool. Integrates a Flutter mobile application for field staff, a Next.js administrative console, and real-time database state sync via Supabase.",
      tags: ["Flutter", "Next.js", "Supabase", "Internal Tool", "Real-Time Databases"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View System Screenshots", folder: "landgraf" }
      ],
      featured: true,
    },
    {
      title: "Ecobelle - Mobile Booking & CMS App",
      subtitle: "Client & Scheduling Interface",
      desc: "A custom Flutter mobile client providing direct residential service booking, calendar coordination, and dynamic CMS content delivery powered by Next.js and Supabase cloud data storage.",
      tags: ["Flutter", "Next.js", "Supabase", "CMS Integration", "Client Portals"],
      category: "mobile",
      links: [
        { type: 'gallery', label: "View App Screenshots", folder: "ecobelle" }
      ],
      featured: false,
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
        @keyframes subtleGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
          50% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
        }
        .accent-glow-card:hover {
          animation: subtleGlow 3s infinite ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200 relative overflow-x-hidden">
        
        {/* ==================== AMBIENT LIGHT OVERLAYS ==================== */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[800px] right-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

        {/* ==================== HERO SECTION ==================== */}
        <header className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/5 border border-violet-500/20 rounded-full text-xs font-semibold text-violet-400 mb-6">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse"></span>
              Engineering Hub
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
              Engineering Clean, High-Impact Digital Platforms
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              We architect performant codebases across web, mobile, and CMS ecosystems. Private client repositories and system schemas are secured within protected workspaces on our{' '}
              <a 
                href="https://github.com/AZBrandCanada" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-violet-400 hover:text-violet-300 font-bold underline transition-colors"
              >
                GitHub
              </a>.
            </p>
          </div>
        </header>

        {/* ==================== INTERACTIVE TECH MATRIX PANEL ==================== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 text-slate-300">Technical Capability Matrix</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Vertical Tab Controller */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {Object.keys(techMatrix).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMatrixTab(tab)}
                    className={`text-left px-4 py-3 rounded-xl font-bold text-sm tracking-wide transition-all border cursor-pointer ${
                      activeMatrixTab === tab
                        ? 'bg-violet-500/10 border-violet-500/40 text-violet-300'
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-900/50 hover:text-white'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Skill Matrix Visual Panel */}
              <div className="lg:col-span-8 bg-slate-900/10 border border-slate-800/60 p-6 rounded-xl flex flex-col justify-center">
                <h3 className="text-lg font-black text-white mb-1">
                  {techMatrix[activeMatrixTab].title}
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  {techMatrix[activeMatrixTab].desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {techMatrix[activeMatrixTab].skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-slate-900">
                      <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== PORTFOLIO INTERACTIVE WORKSPACE ==================== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          
          {/* Dynamic Category Filtering Bar */}
          <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-900 pb-6">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20 border border-violet-400'
                    : 'bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mounted && filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className={`group relative bg-slate-900/20 border rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-800 accent-glow-card ${
                  project.featured 
                    ? 'border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent' 
                    : 'border-slate-900'
                }`}
              >
                {/* Featured Badge or In-Development Status Label */}
                {project.status ? (
                  <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 text-[9px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest border border-amber-500/20 flex items-center gap-1.5 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                    {project.status}
                  </div>
                ) : project.featured ? (
                  <div className="absolute top-4 right-4 bg-violet-500/10 text-violet-400 text-[9px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest border border-violet-500/20">
                    Featured Stack
                  </div>
                ) : null}

                <div>
                  {/* Category Badging */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="bg-slate-950 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-black tracking-widest text-violet-500 uppercase">
                    {project.subtitle}
                  </span>
                  
                  <h3 className="text-xl font-black text-white tracking-tight mt-1 mb-3 group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* ==================== ADAPTIVE LINK CONTROLS ==================== */}
                <div className="flex flex-col gap-2 mt-4">
                  {project.links.map((link, linkIdx) => {
                    // 1. App Store Layout Button
                    if (link.type === 'appstore') {
                      return (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 w-full bg-slate-900 border border-slate-800 hover:border-violet-500/30 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all hover:bg-slate-850"
                        >
                          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.07-3.47-2.91-7.44-7.73-11.91-14.47-11.52-17.55-17.28-36.42-17.28-56.6 0-15.66 4.03-28.74 12.08-39.22 8.06-10.48 18.04-15.82 29.95-16.03 4.81 0 10.02 1.48 15.61 4.43 5.59 2.96 9.68 4.43 12.28 4.43 2.13 0 6.04-1.39 11.75-4.18 5.7-2.79 10.8-4.1 15.31-3.92 14.54.54 25.7 5.92 33.48 16.14-13.98 8.44-20.8 19.98-20.48 34.61.32 11.39 4.6 20.9 12.83 28.53 8.24 7.62 17.7 11.66 28.38 12.11-2.02 5.86-4.54 11.72-7.55 17.58zm-15.11-105.7c0-11.29 4.14-21.36 12.43-30.22 8.51-9.2 18.52-14.07 30.04-14.59.1 1.25.16 2.2.16 2.85 0 10.63-4.12 20.52-12.38 29.66-8.24 9.14-18.15 14.15-29.74 15.04-.32-1.04-.51-1.74-.51-2.74z" />
                          </svg>
                          {link.label}
                        </a>
                      );
                    }
                    
                    // 2. Play Store Layout Button
                    if (link.type === 'playstore') {
                      return (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 w-full bg-slate-900 border border-slate-800 hover:border-violet-500/30 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all hover:bg-slate-850"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                          </svg>
                          {link.label}
                        </a>
                      );
                    }

                    // 3. Dynamic Scan Gallery Button
                    if (link.type === 'gallery') {
                      const imageList = 
                        link.folder === 'landgraf' ? landgrafImages : 
                        link.folder === 'ecobelle' ? ecobelleImages : anxietyGuyImages;
                      const count = imageList.length;
                      return (
                        <button
                          key={linkIdx}
                          onClick={() => openGallery(link.folder)}
                          className="flex items-center justify-center gap-2.5 w-full bg-violet-600 hover:bg-violet-500 border border-violet-500 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all cursor-pointer"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          {link.label} ({count} {count === 1 ? 'image' : 'images'})
                        </button>
                      );
                    }

                    // 4. Default Live Web Experience
                    return (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-violet-400 transition-colors py-1.5 self-start"
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
            ))}
          </div>
        </section>

        {/* ==================== PORTRAIT-SAFE EXPANDABLE SCREENSHOT GALLERY MODAL ==================== */}
        {activeGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-opacity">
            <div className="absolute inset-0 cursor-pointer" onClick={closeGallery} />
            
            <div className="relative w-full max-w-4xl px-4 flex flex-col items-center h-[90vh] justify-between z-10">
              
              {/* Modal Metadata Top Bar */}
              <div className="w-full flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-400 leading-none mb-1">
                    {activeGallery === 'landgraf' ? 'Landgraf Booking App' : activeGallery === 'ecobelle' ? 'Ecobelle CMS App' : 'The Anxiety Guy App'} Preview
                  </span>
                  {getActiveImages().length > 0 && (
                    <span className="text-[10px] text-slate-500 font-bold">
                      Image {currentImageIndex + 1} of {getActiveImages().length} • Click image to zoom & pan
                    </span>
                  )}
                </div>
                <button 
                  onClick={closeGallery}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-800 hover:border-slate-700 bg-slate-900 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Close (Esc)
                </button>
              </div>

              {/* Flex-grow container: Fits both portrait and landscape sizes perfectly without a forced 16:9 ratio */}
              <div 
                className={`relative w-full flex-1 flex items-center justify-center bg-slate-950/40 border border-slate-900 rounded-2xl ${
                  isZoomed ? 'overflow-auto touch-pan-x touch-pan-y' : 'overflow-hidden'
                }`}
                style={{ maxHeight: '72vh' }}
              >
                {getActiveImages().length > 0 ? (
                  <img 
                    src={getActiveImages()[currentImageIndex]} 
                    alt={`Asset index ${currentImageIndex}`} 
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`transition-all duration-300 object-contain select-none ${
                      isZoomed 
                        ? 'max-h-none max-w-none w-[180%] cursor-zoom-out py-8' 
                        : 'max-h-[68vh] max-w-full cursor-zoom-in'
                    }`}
                  />
                ) : (
                  // Empty workspace helper state
                  <div className="text-center p-8">
                    <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <h4 className="text-sm font-bold text-white mb-1">No Assets Detected</h4>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Upload your screens directly into <code className="text-violet-400">/public/{activeGallery}/</code> to automatically populate this interface.
                    </p>
                  </div>
                )}
              </div>

              {/* Prev / Next controls and Zoom State Indicators */}
              <div className="w-full flex justify-between items-center mt-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-4 py-2.5 rounded-lg border text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isZoomed 
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-300' 
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {isZoomed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9V4.5M15 9h4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                    )}
                  </svg>
                  {isZoomed ? "Zoom: 180% (Pan)" : "Tap Image to Zoom"}
                </button>

                {getActiveImages().length > 1 && (
                  <div className="flex gap-2">
                    <button 
                      onClick={prevImage}
                      className="p-3 border border-slate-800 hover:border-violet-500/30 bg-slate-900 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="p-3 border border-slate-800 hover:border-violet-500/30 bg-slate-900 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== FOOTER SECTION ==================== */}
        <footer className="border-t border-slate-900 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-xs text-slate-500 font-medium">
              © 2026 AZ Brand Canada. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/AZBrandCanada" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
              >
                GitHub Hub
              </a>
              <span className="h-3.5 w-[1px] bg-slate-900"></span>
              <a 
                href="https://azbrand.ca" 
                className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
              >
                AZBrand Main Domain
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}