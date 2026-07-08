import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>HandyHeroYYC | Calgary General Contracting & Home Repair</title>
        <meta name="description" content="Professional general contracting, home renovations, and property repairs in Calgary (YYC)." />
      </Head>

      <header className="relative bg-slate-950 text-white text-center py-24 md:py-32 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Reliable Property Solutions in Calgary
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
            From general contracting and home renovations to hauling and landscaping, HandyHeroYYC gets the job done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link href="/services" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider text-center">
              Our Services
            </Link>
            <Link href="/contact" className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-black py-4 px-8 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider text-center">
              Request a Quote
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-slate-950 py-16 md:py-24 text-slate-100 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Why Choose HandyHero<span className="text-amber-500">YYC</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4 mb-16 text-base sm:text-lg leading-relaxed">
            We provide dependable, high-quality residential and commercial property solutions. No project is too small or too large for our dedicated crew.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-900/40 border border-slate-900/60 p-8 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-4">Professional Standards</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Experienced crew committed to clean, structural, and beautiful finishes on every project.
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-900/60 p-8 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-4">Comprehensive Services</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                One contact point for everything from renovations and foundation repair to hauling and waste management.
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-900/60 p-8 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-4">Calgary Proud</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Locally owned and operated, dedicated to helping Calgary (YYC) homeowners and businesses maintain their properties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}