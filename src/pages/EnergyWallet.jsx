import React, { useState } from 'react';
import { Wallet, Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Minus } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';
import { useNavigate } from 'react-router-dom';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

export default function EnergyWallet() {
  const { walletBalance, energyCredits, transactions } = useEnergy();
  const navigate = useNavigate();
  const [showSell, setShowSell] = useState(false);

  const energyGenerated = transactions.filter(t => t.type === 'sell').reduce((s, t) => s + t.kwh, 0);
  const energyConsumed = transactions.filter(t => t.type === 'buy').reduce((s, t) => s + t.kwh, 0);
  const energySold = transactions.filter(t => t.type === 'sell').reduce((s, t) => s + t.amount, 0);
  const energyBought = Math.abs(transactions.filter(t => t.type === 'buy').reduce((s, t) => s + t.amount, 0));

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>💰 Energy Wallet</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Your energy balance, credits, and transaction history.</p>
      </div>

      {/* Hero balance cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg,#0f2a1a,#0a1a2e)', border: '1px solid #22c55e33' }}>
          <div style={{ fontSize: '12px', color: '#22c55e', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Wallet Balance</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#22c55e' }}>₹{walletBalance.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Available for energy purchases</div>
        </div>
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg,#0a1a2e,#1a0a2e)', border: '1px solid #3b82f633' }}>
          <div style={{ fontSize: '12px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Energy Credits</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#3b82f6' }}>{energyCredits.toFixed(1)} kWh</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Credited to your account</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Energy Generated', value: `${energyGenerated.toFixed(1)} kWh`, color: '#facc15', icon: <TrendingUp size={16} color="#facc15" /> },
          { label: 'Energy Consumed', value: `${energyConsumed.toFixed(1)} kWh`, color: '#ef4444', icon: <TrendingDown size={16} color="#ef4444" /> },
          { label: 'Revenue (Sold)', value: `₹${energySold.toFixed(0)}`, color: '#22c55e', icon: <ArrowUpRight size={16} color="#22c55e" /> },
          { label: 'Spent (Bought)', value: `₹${energyBought.toFixed(0)}`, color: '#3b82f6', icon: <ArrowDownRight size={16} color="#3b82f6" /> },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>{s.icon}<span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>{s.label}</span></div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/marketplace')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: 'white', border: 'none', cursor: 'pointer' }}>
          <Plus size={15} /> Buy Energy
        </button>
        <button onClick={() => setShowSell(!showSell)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer' }}>
          <Minus size={15} /> {showSell ? 'Cancel' : 'Sell Energy'}
        </button>
      </div>

      {showSell && <SellModal />}

      {/* Transaction table */}
      <div style={cardStyle}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '14px', textTransform: 'uppercase' }}>Recent Transactions</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2d4a' }}>
                {['Date', 'Description', 'Amount (₹)', 'kWh', 'Type'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 15).map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #1e2d4a11' }}>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{t.date}</td>
                  <td style={{ padding: '10px 12px', color: '#e2e8f0' }}>{t.description}</td>
                  <td style={{ padding: '10px 12px', fontWeight: '600', color: t.amount > 0 ? '#22c55e' : '#ef4444' }}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#3b82f6' }}>{t.kwh > 0 ? `${t.kwh} kWh` : '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: t.type === 'sell' ? 'rgba(34,197,94,0.15)' : t.type === 'buy' ? 'rgba(59,130,246,0.15)' : 'rgba(167,139,250,0.15)', color: t.type === 'sell' ? '#22c55e' : t.type === 'buy' ? '#3b82f6' : '#a78bfa' }}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SellModal() {
  const { sellEnergy, energyCredits } = useEnergy();
  const [kwh, setKwh] = useState('');
  const [price, setPrice] = useState('5.5');
  const [done, setDone] = useState(null);

  const handle = () => {
    const result = sellEnergy(parseFloat(kwh), parseFloat(price));
    setDone(result);
  };

  if (done) {
    return (
      <div className="fade-in" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e44', borderRadius: '14px', padding: '16px', marginBottom: '20px', color: '#22c55e', fontWeight: '600' }}>
        ✅ {done.success ? `Listed ${kwh} kWh! Wallet credited ₹${done.revenue?.toLocaleString('en-IN')}` : done.error}
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '14px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <div>
        <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>kWh to Sell (max {energyCredits.toFixed(1)})</label>
        <input type="number" max={energyCredits} value={kwh} onChange={e => setKwh(e.target.value)} style={{ background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0', width: '140px', outline: 'none' }} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Price per kWh (₹)</label>
        <input type="number" step="0.1" value={price} onChange={e => setPrice(e.target.value)} style={{ background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0', width: '120px', outline: 'none' }} />
      </div>
      <div>
        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Revenue</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>₹{kwh && price ? (parseFloat(kwh) * parseFloat(price)).toFixed(2) : '0.00'}</div>
      </div>
      <button onClick={handle} style={{ padding: '8px 20px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
        List Surplus
      </button>
    </div>
  );
}
