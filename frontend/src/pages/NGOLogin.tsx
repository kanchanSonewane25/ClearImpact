import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function NGOLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.role !== 'admin') {
        setError('Access denied. Staff privileges required.');
        return;
      }
      login(res.data);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center py-10 px-5">
      <div className="bg-white border border-border rounded-2xl p-10 max-w-[420px] w-full shadow-sm">
        <div className="text-center mb-7">
          <div className="font-serif text-2xl font-bold text-forest">Clear<em className="not-italic text-amber">Impact</em></div>
          <div className="inline-block mt-2 text-[10px] uppercase font-bold text-teal bg-teal-light border border-teal-mid px-2 py-0.5 rounded-full tracking-widest">NGO Admin Portal</div>
          <h2 className="mt-3 text-2xl font-bold text-ink">Staff Sign In</h2>
          <p className="text-muted text-sm mt-1">Manage donations, upload reports</p>
        </div>
        
        {error && <div className="bg-danger/10 border-l-4 border-danger text-danger p-3 rounded text-sm mb-4">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Staff Email</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm text-ink outline-none focus:border-teal transition-colors" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="staff@anandwan.org" required />
          </div>
          <div className="mb-6">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Password</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm text-ink outline-none focus:border-teal transition-colors" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Staff password" required />
          </div>
          <button type="submit" className="w-full p-3 bg-teal text-white rounded-lg text-[15px] font-semibold hover:bg-forest transition-colors">Access Portal</button>
        </form>
        
        <p className="text-center text-[13px] text-muted mt-4">Donor? <Link to="/login" className="text-teal font-semibold">Donor Sign In →</Link></p>
      </div>
    </div>
  );
}
