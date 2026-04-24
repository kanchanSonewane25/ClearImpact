import { useState } from 'react';
import api from '../lib/api';
import Footer from '../components/Footer';

export default function Tracker() {
  const [traceId, setTraceId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTrace = async () => {
    if(!traceId) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await api.get(`/donations/track/${traceId}`);
      setResult(res.data);
    } catch(err: any) {
      setError(err.response?.data?.message || 'Trace ID not found');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-[4vw] pt-[36px]">
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1]">Track Your Donation</h1>
        <p className="text-muted text-[15px] mt-[6px]">Enter your unique Traceability ID to follow your contribution from gift to ground-level impact.</p>
      </div>
      <div className="px-[4vw] py-[28px] mb-[60px] flex-1 max-w-[700px]">
        <div className="flex gap-2.5 mb-7">
          <input 
             className="flex-1 p-3 border-2 border-border rounded-lg text-sm font-mono text-ink outline-none focus:border-teal"
             placeholder="Enter Trace ID (e.g. CI-2024-08472)" 
             value={traceId} onChange={e=>setTraceId(e.target.value)} 
          />
          <button onClick={fetchTrace} disabled={loading} className="px-5 py-3 bg-teal text-white rounded-lg text-[15px] font-semibold hover:bg-forest disabled:opacity-50">Track →</button>
        </div>
        
        {error && <div className="text-danger p-3 bg-danger/10 border-l-4 border-danger rounded mb-4">{error}</div>}
        
        {result && (
          <div className="bg-white border text-left border-border rounded-2xl p-6 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Donation Details</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${result.donation.status === 'completed' ? 'bg-blue-100 text-blue-700' : result.donation.status === 'deployed' ? 'bg-teal-pale text-teal-mid' : 'bg-amber-light text-amber'}`}>{result.donation.status}</span>
             </div>
             <p className="text-sm mb-1"><strong>Amount:</strong> ₹{result.donation.amount}</p>
             <p className="text-sm mb-1"><strong>Allocated To:</strong> {result.donation.allocatedTo}</p>
             <p className="text-sm mb-1"><strong>Donor:</strong> {result.donation.guestName || result.donation.donor?.name || 'Anonymous'}</p>
             <p className="text-sm text-muted mt-2 font-mono text-xs">ID: {result.donation.traceId}</p>

             {(result.donation.status === 'completed' || result.donation.status === 'deployed') && (
                <div className="mt-4">
                  <a 
                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payments/receipt/${result.donation.traceId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-teal-pale text-teal font-semibold rounded hover:bg-teal hover:text-white transition-colors text-sm"
                  >
                    Download 80G Tax Receipt
                  </a>
                </div>
             )}

             {result.updates && result.updates.length > 0 && (
                <div className="mt-6 border-t border-border pt-4">
                   <h4 className="font-bold mb-3">Impact Updates</h4>
                   {result.updates.map((u: any) => (
                      <div key={u._id} className="p-3 bg-teal-pale border border-border-light rounded mb-2">
                         <div className="font-semibold text-sm">{u.reportTitle}</div>
                         <div className="text-xs text-muted mb-1">{u.category}</div>
                         <p className="text-sm">{u.notes}</p>
                         {u.fileUrl && (
                           <a href={u.fileUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-medium text-xs mt-2 block hover:underline">View Report File</a>
                         )}
                      </div>
                   ))}
                </div>
             )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
