import Footer from '../components/Footer';

export default function Programs() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-[4vw] py-[60px] max-w-4xl mx-auto w-full">
        <div className="inline-block text-[10px] uppercase font-bold text-teal bg-teal-light border border-teal-mid px-2 py-0.5 rounded-full tracking-widest mb-4">Empowering Residents</div>
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1] mb-6">Our Programs</h1>
        <p className="text-muted mb-8 leading-relaxed">
          From advanced healthcare clinics to expansive agricultural initiatives and vocational training centers, Anandwan's programs are designed to empower residents and foster sustainable, self-sufficient livelihoods.
        </p>
      </div>
      <Footer />
    </div>
  );
}
