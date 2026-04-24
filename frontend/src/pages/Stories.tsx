import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function Stories() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    api.get('/stories').then(res => setStories(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-[4vw] pt-[36px]">
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1]">Resident Journeys</h1>
        <p className="text-muted text-[15px] mt-[6px]">Behind every donation is a human story. Meet the people your generosity supports at Anandwan.</p>
      </div>
      
      <div className="px-[4vw] py-[28px] mb-[60px] flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.length === 0 && <p className="text-muted text-sm col-span-full">No stories available.</p>}
          {stories.map(s => (
             <div key={s._id} className="bg-white border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col">
                <div className={`h-[140px] flex items-center justify-center text-[50px] bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]`}>
                  {s.imageUrl || "📖"}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-1.5">{s.category || 'General'}</div>
                  <h3 className="text-base font-bold mb-2">{s.title}</h3>
                  <p className="text-[13px] text-muted leading-[1.65] mb-4 flex-1">{s.content}</p>
                  <div className="flex justify-between items-center text-[13px] border-t border-border-light pt-3 mt-auto">
                    <span className="font-semibold">{s.author || 'Anandwan Resident'}</span>
                    <Link to="/donate" className="text-teal font-semibold hover:underline">Support →</Link>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
