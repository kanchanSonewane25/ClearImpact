import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-[#9ca3af] px-[4vw] pt-[50px] pb-[24px] mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-[40px] mb-[40px]">
        <div>
          <div className="font-serif text-[22px] font-bold text-white mb-[10px]">
            Clear<em className="not-italic text-teal-mid">Impact</em>
          </div>
          <p className="text-[13px] leading-[1.7]">Restoring donor trust through radical transparency at Anandwan, Warora — and building a global model for nonprofit accountability.</p>
        </div>
        <div>
          <h4 className="text-[12px] font-semibold uppercase tracking-[1px] text-white mb-[14px]">Platform</h4>
          <Link to="/dashboard" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Donor Dashboard</Link>
          <Link to="/track" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Impact Tracker</Link>
          <Link to="/stories" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Stories Hub</Link>
        </div>
        <div>
          <h4 className="text-[12px] font-semibold uppercase tracking-[1px] text-white mb-[14px]">Anandwan</h4>
          <Link to="/about" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">About</Link>
          <Link to="/programs" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Programs</Link>
          <Link to="/volunteer" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Volunteer</Link>
          <Link to="/visit" className="block text-[13px] text-[#9ca3af] mb-[8px] hover:text-teal-mid transition-colors">Visit Us</Link>
        </div>
        <div>
          <h4 className="text-[12px] font-semibold uppercase tracking-[1px] text-white mb-[14px]">Contact</h4>
          <span className="block text-[13px] text-[#9ca3af] mb-[8px]">Warora, Maharashtra</span>
          <span className="block text-[13px] text-[#9ca3af] mb-[8px]">info@clearimpact.in</span>
          <span className="block text-[13px] text-[#9ca3af] mb-[8px]">+91 98765 43210</span>
        </div>
      </div>
      <div className="border-t border-white/10 pt-[20px] flex justify-between items-center text-[12px]">
        <span>© 2024 ClearImpact · Built for Anandwan, Warora.</span>
        <span>Nachiket · Aditya · Keyur · Tanmay · Kanchan</span>
      </div>
    </footer>
  );
}
