import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
        const res = await api.post('/auth/register', { name, email, password, phone, role: 'donor' });
      login(res.data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center py-10 px-5">
      <div className="bg-white border border-border rounded-2xl p-10 max-w-[420px] w-full shadow-sm">
        <div className="text-center mb-7">
          <div className="font-serif text-2xl font-bold text-forest">Clear<em className="not-italic text-amber">Impact</em></div>
          <h2 className="mt-3 text-2xl font-bold text-ink">Create Donor Account</h2>
          <p className="text-muted text-sm mt-1">Join transparent giving at Anandwan</p>
        </div>
        
        {error && <div className="bg-danger/10 border-l-4 border-danger text-danger p-3 rounded text-sm mb-4">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Full Name</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-teal" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Email</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-teal" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Password</label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-teal" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          </div>
          <div className="mb-6">
            <label className="block text-[13px] font-semibold text-ink-2 mb-1.5">Phone <span className="font-normal text-muted-light">(optional)</span></label>
            <input className="w-full p-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-teal" value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <button type="submit" className="w-full p-3 bg-teal text-white rounded-lg text-[15px] font-semibold hover:bg-forest transition-colors">Create Account</button>
        </form>
        
        <p className="text-center text-[13px] text-muted mt-4">Already have an account? <Link to="/login" className="text-teal font-semibold">Sign in</Link></p>
      </div>
    </div>
  );
}
