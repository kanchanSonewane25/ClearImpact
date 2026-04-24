import Footer from '../components/Footer';

export default function Visit() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-[4vw] py-[60px] max-w-4xl mx-auto w-full">
        <div className="inline-block text-[10px] uppercase font-bold text-teal bg-teal-light border border-teal-mid px-2 py-0.5 rounded-full tracking-widest mb-4">Welcome Home</div>
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1] mb-6">Visit Anandwan</h1>
        <p className="text-muted mb-8 leading-relaxed">
          Experience the vibrant community of Anandwan firsthand. We offer guided tours and accommodations for visitors interested in learning about our sustainable practices and social initiatives in Warora, Maharashtra.
        </p>
      </div>
      <Footer />
    </div>
  );
}
