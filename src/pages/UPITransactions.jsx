import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';

const PRICE_PER_KWH = 6;

export default function UPITransactions() {
  const { selectedSeller, buyEnergy, walletBalance } = useEnergy();
  const [kwh, setKwh] = useState('50');
  const [status, setStatus] = useState('idle'); // idle | processing | success | error
  const [result, setResult] = useState(null);

  const seller = selectedSeller;
  const effectivePrice = seller ? seller.price : PRICE_PER_KWH;
  const total = parseFloat((parseFloat(kwh || 0) * effectivePrice).toFixed(2));

  const handlePay = async () => {
    if (!kwh || parseFloat(kwh) <= 0) return;
    setStatus('processing');
    await new Promise(r => setTimeout(r, 1800));
    if (seller) {
      const res = buyEnergy(seller.id, parseFloat(kwh));
      setResult(res);
      setStatus(res.success ? 'success' : 'error');
    } else {
      // Generic purchase without a specific seller
      if (walletBalance >= total) {
        setResult({ success: true, total });
        setStatus('success');
      } else {
        setResult({ success: false, error: 'Insufficient wallet balance' });
        setStatus('error');
      }
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: '520px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>💳 Energy UPI Transactions</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Purchase clean energy instantly via Energy UPI.</p>
      </div>

      {status === 'success' ? (
        <div className="fade-in" style={{ background: '#151f35', border: '1px solid #22c55e55', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.15)' }}>
            <CheckCircle size={40} color="#22c55e" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#22c55e' }}>Payment Successful!</h2>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>
            <strong style={{ color: '#e2e8f0' }}>{kwh} kWh</strong> of energy added to your wallet.<br />
            <strong style={{ color: '#ef4444' }}>₹{result?.total?.toLocaleString('en-IN') || total.toLocaleString('en-IN')}</strong> deducted from balance.
          </p>
          <div style={{ background: '#0f1729', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Transaction ID</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', fontFamily: 'monospace' }}>EK-{Date.now().toString(36).toUpperCase()}</div>
          </div>
          <button onClick={() => setStatus('idle')} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>
            New Transaction
          </button>
        </div>
      ) : (
        <div style={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '20px', padding: '28px' }}>
          {/* Seller info */}
          {seller && (
            <div style={{ background: '#0f1729', borderRadius: '12px', padding: '14px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
                <Zap size={18} color="#22c55e" />
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#e2e8f0' }}>{seller.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>📍 {seller.location} · ₹{seller.price}/kWh · {seller.energy} kWh available</div>
              </div>
            </div>
          )}

          {/* kWh input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Energy Amount (kWh)</label>
            <input
              type="number" value={kwh} onChange={e => setKwh(e.target.value)} min="1" max={seller?.energy || 999}
              style={{ width: '100%', background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '12px', padding: '14px 16px', color: '#e2e8f0', fontSize: '18px', fontWeight: '700', outline: 'none', textAlign: 'center' }}
            />
          </div>

          {/* Price breakdown */}
          <div style={{ background: '#0f1729', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Energy purchased</span>
              <span style={{ color: '#e2e8f0' }}>{kwh || 0} kWh</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Price per kWh</span>
              <span style={{ color: '#e2e8f0' }}>₹{effectivePrice}</span>
            </div>
            <div style={{ borderTop: '1px solid #1e2d4a', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700' }}>
              <span style={{ color: '#94a3b8' }}>Total</span>
              <span style={{ color: '#22c55e' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Wallet balance check */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Wallet Balance</span>
            <span style={{ color: walletBalance >= total ? '#22c55e' : '#ef4444', fontWeight: '600' }}>₹{walletBalance.toLocaleString('en-IN')}</span>
          </div>

          {status === 'error' && (
            <div className="fade-in" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#ef4444' }}>
              <AlertCircle size={15} /> {result?.error}
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={status === 'processing' || walletBalance < total || !kwh || parseFloat(kwh) <= 0}
            style={{
              width: '100%', padding: '14px', borderRadius: '14px', border: 'none',
              background: status === 'processing' ? '#1e2d4a' : 'linear-gradient(135deg,#22c55e,#16a34a)',
              color: status === 'processing' ? '#64748b' : 'white',
              fontWeight: '700', fontSize: '15px', cursor: status === 'processing' ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
            <CreditCard size={18} />
            {status === 'processing' ? '⚡ Processing Payment...' : `Pay ₹${total.toLocaleString('en-IN')} via Energy UPI`}
          </button>
          <p style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
            🔒 Secured by Energy UPI · Instant settlement
          </p>
        </div>
      )}
    </div>
  );
}
