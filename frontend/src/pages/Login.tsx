import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data);
      navigate(res.data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center py-10 px-5">
      <div className="bg-white border border-border rounded-2xl p-10 max-w-[420px] w-full shadow-sm">
        <div className="text-center mb-7">
          <div className="font-serif text-2xl font-bold text-forest">Clear<em className="not-italic text-amber">Impact</em></div>
          <h2 className="mt-3 text-2xl font-bold text-ink">Donor Sign In</h2>
          <p className="text-muted text-sm mt-1">Access your impact dashboard</p>
        </div>
        
        {error && <div className="bg-danger/10 border-l-4 border-danger text-danger p-3 rounded text-sm mb-4">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Email</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm text-ink outline-none focus:border-teal transition-colors" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com" required />
          </div>
          <div className="mb-6">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Password</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm text-ink outline-none focus:border-teal transition-colors" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Your password" required />
          </div>
          <button type="submit" className="w-full p-3 bg-teal text-white rounded-lg text-[15px] font-semibold hover:bg-forest transition-colors">Sign In</button>
        </form>
        
        <p className="text-center text-[13px] text-muted mt-4">New donor? <Link to="/register" className="text-teal font-semibold">Create account</Link></p>
        <p className="text-center text-[13px] text-muted mt-2">NGO staff? <Link to="/admin/login" className="text-teal font-semibold">NGO Portal →</Link></p>
      </div>
    </div>
  );
}
