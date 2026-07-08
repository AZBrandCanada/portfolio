import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Submission failed. Please check configurations.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Contact Us | HandyHeroYYC</title>
        <meta name="description" content="Get an estimate or request service from HandyHeroYYC in Calgary." />
      </Head>

      <section className="bg-slate-950 py-16 md:py-24 text-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Block */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Contact HandyHero<span className="text-amber-500">YYC</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Fill out the form below or contact us directly to request an estimate or schedule general contracting services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-slate-900 bg-slate-900/40 p-8 rounded-2xl">
                <h2 className="text-xl font-black text-white mb-2">Get In Touch</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  We serve Calgary (YYC) and nearby areas. Reach out with your project details, and we will get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  {/* Service Area Card */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-sm text-slate-300 font-extrabold uppercase tracking-wide">Service Area</strong>
                      <p className="text-slate-200 text-sm mt-1">Calgary, AB & Surrounding Communities</p>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.115-.44.05-.927.438-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-sm text-slate-300 font-extrabold uppercase tracking-wide">Call Direct</strong>
                      <a href="tel:+15874290027" className="text-amber-400 hover:text-amber-300 text-sm mt-1 block font-black underline">
                        +1 (587) 429-0027
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-sm text-slate-300 font-extrabold uppercase tracking-wide">Email</strong>
                      <a href="mailto:HandyHeroYYC@proton.me" className="text-amber-400 hover:text-amber-300 text-sm mt-1 block font-black underline">
                        HandyHeroYYC@proton.me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Submission Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border border-emerald-900/30 bg-emerald-950/20 p-8 rounded-2xl text-center">
                  <div className="mx-auto w-14 h-14 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-full mb-4 border border-emerald-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-white">Estimate Request Received!</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    Thank you for reaching out to HandyHeroYYC. We have received your project details and will review them shortly. Expect a callback or email soon.
                  </p>
                </div>
              ) : (
                <form className="space-y-5 border border-slate-900 bg-slate-900/20 p-8 rounded-2xl" onSubmit={handleSubmit}>
                  
                  {/* Error State */}
                  {error && (
                    <div className="bg-red-950/30 border border-red-900/40 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                      placeholder="+1 (587) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Please describe what you need completed (e.g., basement renovation, fencing install, landscaping work)..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/40 disabled:cursor-not-allowed text-slate-950 font-black py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform flex justify-center items-center gap-2.5 text-xs uppercase tracking-wider"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}