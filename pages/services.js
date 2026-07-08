import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  const serviceList = [
    {
      title: 'General Contracting',
      description: 'End-to-end management and coordination for residential projects and property updates.'
    },
    {
      title: 'Renovations',
      description: 'Kitchen, bathroom, basement, and full-home structural transformations tailored to your style.'
    },
    {
      title: 'Repairs & Handyman Work',
      description: 'Prompt and reliable fixes for standard home wear and tear, updates, and maintenance.'
    },
    {
      title: 'Hauling & Transport Services',
      description: 'Safe, prompt transport and delivery services for materials, appliances, and bulky goods.'
    },
    {
      title: 'Garbage Removal',
      description: 'Responsible sorting, site clean-up, and waste disposal to leave your property immaculate.'
    },
    {
      title: 'Foundation Crack Repairs',
      description: 'Expert diagnostics and repair solutions to secure your basement and keep water out.'
    },
    {
      title: 'Landscaping',
      description: 'Enhancing outdoor appeal through sod installation, garden construction, stone walkways, and more.'
    },
    {
      title: 'Exterior Siding (Vinyl & Stucco)',
      description: 'High-quality insulation and premium exterior protection featuring durable vinyl and stucco finishes.'
    },
    {
      title: 'Flooring',
      description: 'Professional installation of durable hardwood, laminate, vinyl plank, and tile options.'
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services | HandyHeroYYC</title>
        <meta name="description" content="Explore our contracting, siding, repairs, hauling, and landscaping services in YYC." />
      </Head>

      <section className="bg-slate-950 py-16 md:py-24 text-slate-100 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Our Professional Services
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We handle projects from basement foundations all the way to exterior siding. Explore how we can assist with your home or business.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-16 md:py-24 text-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service, index) => (
              <div key={index} className="border border-slate-900 bg-slate-900/40 p-8 rounded-2xl hover:border-slate-800 transition-colors">
                <h3 className="text-xl font-black text-amber-500 mb-4">{service.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-400 my-4 text-sm sm:text-base leading-relaxed">
              Get in touch with us today for a straightforward project estimate.
            </p>
            <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}