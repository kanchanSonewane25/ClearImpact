import Footer from '../components/Footer';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Donate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      setError('Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/payments/create-order', {
        amount,
        allocatedTo: 'General Fund',
        userId: user ? user.id : undefined,
        guestName: user ? undefined : 'Guest Donor',
        guestEmail: user ? undefined : 'guest@example.com'
      });

      const options = {
        key: 'rzp_test_YourKeyIdHere', // Replace with your key in production
        amount: data.order.amount,
        currency: 'INR',
        name: 'ClearImpact Foundation',
        description: 'Donation for Anandwan',
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donationId: data.donation._id
            });
            alert('Payment successful! Your Trace ID is ' + data.donation.traceId);
            navigate('/track');
          } catch (err) {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: user ? user.name : 'Guest Donor',
          email: user ? user.email : 'guest@example.com',
        },
        theme: {
          color: '#0d9488'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError('Error initiating payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-[4vw] py-[60px] max-w-3xl mx-auto w-full text-center">
        <h1 className="text-[clamp(26px,4vw,38px)] font-bold text-ink leading-[1.1] mb-6">Make a Transparent Impact</h1>
        <p className="text-muted mb-8 leading-relaxed max-w-xl mx-auto">
          Every contribution you make generates a Traceability ID. We ensure 100% visibility into exactly how your funds are utilized for community development at Anandwan.
        </p>
        <div className="bg-white p-12 border border-border rounded-2xl shadow-sm text-left max-w-xl mx-auto">
          <h3 className="font-bold text-xl mb-4 text-ink-2">Donation Form</h3>
          <p className="text-sm text-muted mb-6">Select or enter the amount you wish to contribute securely today.</p>
          
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          
          <div className="flex gap-3 mb-6 flex-wrap md:flex-nowrap">
            <button onClick={() => setAmount(1000)} className={`flex-1 py-3 px-4 border rounded font-semibold transition-colors ${amount === 1000 ? 'border-teal bg-teal-pale text-teal' : 'border-border text-forest hover:border-teal'}`}>₹1,000</button>
            <button onClick={() => setAmount(2500)} className={`flex-1 py-3 px-4 border rounded font-semibold transition-colors ${amount === 2500 ? 'border-teal bg-teal-pale text-teal' : 'border-border text-forest hover:border-teal'}`}>₹2,500</button>
            <button onClick={() => setAmount(5000)} className={`flex-1 py-3 px-4 border rounded font-semibold transition-colors ${amount === 5000 ? 'border-teal bg-teal-pale text-teal' : 'border-border text-forest hover:border-teal'}`}>₹5,000</button>
          </div>
          <div className="mb-6">
            <input 
              type="number" 
              placeholder="Enter custom amount (₹)" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || '')}
              className="w-full p-3 border border-border rounded-lg text-sm outline-none focus:border-teal transition-colors" 
            />
          </div>
          <button onClick={handlePayment} disabled={loading} className="w-full bg-teal text-white py-3 rounded-lg font-bold hover:bg-forest transition-colors shadow-lg shadow-teal/10 disabled:opacity-50">
            {loading ? 'Processing...' : 'Proceed to Secure Payment'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
