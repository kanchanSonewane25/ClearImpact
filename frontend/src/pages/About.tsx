import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-[4vw] py-[60px] max-w-4xl mx-auto w-full">
        <div className="inline-block text-[10px] uppercase font-bold text-teal bg-teal-light border border-teal-mid px-2 py-0.5 rounded-full tracking-widest mb-4">Our History</div>
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1] mb-6">About Anandwan</h1>
        <p className="text-muted mb-8 leading-relaxed">
          Founded by Baba Amte in 1949, Anandwan (Forest of Joy) is an ashram and a community rehabilitation center for patients of leprosy and other disabilities in Warora, Maharashtra. Today, it stands as a testament to human resilience, self-reliance, and dignity.
        </p>
      </div>
      <Footer />
    </div>
  );
}
