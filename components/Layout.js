import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}