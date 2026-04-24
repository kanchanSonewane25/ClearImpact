import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="px-[4vw] pt-[100px] pb-[90px] bg-gradient-to-br from-white from-55% to-teal-pale flex justify-center text-center">
        <div className="max-w-[700px] flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-teal-light text-forest px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-teal-mid">
            <span className="w-[7px] h-[7px] rounded-full bg-teal"></span>
            Rebuilding Trust · Anandwan, Warora
          </div>
          <h1 className="text-[clamp(38px,6vw,60px)] font-bold leading-[1.05] text-ink mb-6">
            Transparent Giving<br />for <em className="not-italic text-teal">Real Change</em>
          </h1>
          <p className="text-[18px] text-muted leading-[1.75] mb-10 max-w-[560px]">
            See exactly where every rupee goes. Track your donation from gift to ground-level impact.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/donate" className="inline-flex items-center justify-center px-7 py-3.5 bg-teal text-white rounded-lg text-[16px] font-semibold hover:bg-forest transition-colors shadow-lg shadow-teal/20">Donate with Transparency</Link>
            <Link to="/track" className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-teal text-forest rounded-lg text-[16px] font-semibold hover:bg-teal-light transition-colors">Track Your Impact</Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <div className="bg-ink px-[4vw] py-[70px]">
        <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-teal-mid mb-2">The Challenge</div>
        <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-2">The Trust Crisis at Anandwan</h2>
        <p className="text-[#9ca3af] text-[16px] max-w-[540px] leading-[1.7] mb-8">Despite transforming thousands of lives, donors had no visibility into their impact.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="text-white text-base mb-2">Unclear Allocation</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">No visibility into how contributions were specifically used — a black box that eroded confidence.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-white text-base mb-2">Generic Reporting</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">Broad reports with no personal connection or concrete details meaningful to individual donors.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-2xl mb-3">📱</div>
            <h3 className="text-white text-base mb-2">Digital Gap</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">Limited online presence reduced opportunities for ongoing donor relationships.</p>
          </div>
        </div>
        <div className="mt-10 bg-danger/10 border border-danger/25 rounded-xl p-5 text-center text-sm text-[#fca5a5]">
          <strong>The Result:</strong> Eroded trust, declining repeat donations, and missed opportunities for sustained support
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white px-[4vw] py-[70px]">
        <div className="text-center mx-auto max-w-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-teal mb-2">Platform Features</div>
          <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-ink mb-3">Built for Radical Transparency</h2>
          <p className="text-muted text-[16px] leading-[1.7]">Every feature designed to close the gap between donation and demonstrated impact.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* We'll abstract styling for cards, but write HTML-equivalent here */}
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-teal">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">1</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">Donor Dashboard</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Personalized view of your history, current impact, and upcoming programs to support.</p>
          </div>
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-amber">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">2</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">Real-Time Notifications</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Timely email and dashboard updates sent the moment your funds reach residents in the community.</p>
          </div>
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-coral">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">3</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">Storytelling Hub</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Video testimonials, resident journeys, and progress updates that humanize every rupee.</p>
          </div>
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-blue-500">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">4</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">Unique Trace ID</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Every donation gets a tracking code. Follow specific projects and outcomes end-to-end.</p>
          </div>
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-teal-mid">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">5</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">NGO Admin Portal</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Staff can update impact stories, upload reports, and manage donation statuses easily.</p>
          </div>
          <div className="bg-white border text-left border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all relative overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-purple-500">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-4">6</div>
            <h3 className="text-[17px] mb-2 font-serif font-bold">Ethical Storytelling</h3>
            <p className="text-[13px] text-muted leading-[1.7]">Content guidelines ensure respectful, dignity-preserving representation of residents.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
