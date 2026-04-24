import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('/donations/user').then(res => setDonations(res.data));
    api.get('/impact/user').then(res => setReports(res.data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[4vw] pt-[36px]">
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1]">My Impact Dashboard</h1>
        <p className="text-muted text-[15px] mt-[6px]">Track your donations and view your real-world impact at Anandwan, {user?.name}.</p>
      </div>

      <div className="px-[4vw] py-[28px] flex-1 pb-16">
        <h3 className="text-lg font-bold mb-4">My Donations</h3>
        <div className="flex flex-col gap-3">
           {donations.length === 0 ? <p className="text-muted text-sm">No donations yet.</p> : null}
           {donations.map((d: any) => (
              <div key={d._id} className="bg-white border border-border rounded-xl p-5 flex items-start justify-between hover:shadow-md transition-shadow">
                 <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 rounded-full bg-teal-light text-forest flex items-center justify-center font-bold text-[15px] border border-teal-mid shrink-0">₹</div>
                    <div>
                       <div className="text-[15px] font-semibold text-ink">Donation for {d.allocatedTo}</div>
                       <div className="text-[13px] text-muted mt-1 uppercase text-[10px] tracking-widest font-bold">Status: <span className="font-semibold text-teal">{d.status}</span></div>
                       {(d.status === 'completed' || d.status === 'deployed') && (
                         <a 
                           href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payments/receipt/${d.traceId}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-block mt-2 px-3 py-1 bg-teal-pale text-teal font-semibold rounded hover:bg-teal hover:text-white transition-colors text-xs"
                         >
                           Download Receipt
                         </a>
                       )}
                    </div>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    <div className="font-serif text-[22px] font-bold text-forest">₹{d.amount}</div>
                    <div className="font-mono text-[11px] text-muted">{d.traceId}</div>
                 </div>
              </div>
           ))}
        </div>

        <h3 className="text-lg font-bold mt-10 mb-4">My Impact Reports</h3>
        <div className="flex flex-col gap-3">
           {reports.length === 0 ? <p className="text-muted text-sm">No reports available yet.</p> : null}
           {reports.map((r: any) => (
              <div key={r._id} className="bg-white border border-border rounded-xl p-4 flex gap-3 items-center hover:shadow-md transition-shadow">
                 <div className="text-2xl shrink-0 w-11 text-center">📋</div>
                 <div>
                    <strong className="text-sm block">{r.reportTitle}</strong>
                    <span className="text-xs text-muted block mt-1">{r.notes} • <span className="text-teal font-semibold font-mono">{r.category}</span></span>
                    {r.fileUrl && (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-medium text-xs mt-2 block hover:underline">View Report File</a>
                    )}
                 </div>
              </div>
           ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
