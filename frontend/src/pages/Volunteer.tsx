import Footer from '../components/Footer';

export default function Volunteer() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-[4vw] py-[60px] max-w-4xl mx-auto w-full">
        <div className="inline-block text-[10px] uppercase font-bold text-teal bg-teal-light border border-teal-mid px-2 py-0.5 rounded-full tracking-widest mb-4">Join Us</div>
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1] mb-6">Volunteer With Us</h1>
        <p className="text-muted mb-8 leading-relaxed">
          Transform lives by offering your time and skills. We welcome volunteers across the globe to participate in medical camps, educational workshops, and community-building initiatives at Anandwan.
        </p>
      </div>
      <Footer />
    </div>
  );
}
