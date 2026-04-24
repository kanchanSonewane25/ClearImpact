import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('/donations/user').then(res => setDonations(res.data));
    api.get('/impact/user').then(res => setReports(res.data));
  }, []);

  const allocationData = donations.reduce((acc: any, curr: any) => {
    const existing = acc.find((item: any) => item.name === curr.allocatedTo);
    if (existing) existing.value += curr.amount;
    else acc.push({ name: curr.allocatedTo, value: curr.amount });
    return acc;
  }, []);

  const timelineData = [...donations].reverse().map((d: any, index: number) => ({
    name: `Donation ${index + 1}`,
    amount: d.amount
  }));

  const COLORS = ['#1D9E75', '#EF9F27', '#C85A2A', '#5DCAA5'];

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[4vw] pt-[36px]">
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1]">My Impact Dashboard</h1>
        <p className="text-muted text-[15px] mt-[6px]">Track your donations and view your real-world impact at Anandwan, {user?.name}.</p>
      </div>

      <div className="px-[4vw] py-[28px] flex-1 pb-16">
        
        {donations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="text-[15px] font-bold mb-4">Donation Allocation</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {allocationData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="text-[15px] font-bold mb-4">Contribution History</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip cursor={{fill: '#f0faf6'}} formatter={(value) => `₹${value}`} />
                    <Bar dataKey="amount" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

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
