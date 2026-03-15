import React from 'react';
import { ShoppingCart, Star, MapPin, Zap } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';
import { useNavigate } from 'react-router-dom';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

export default function Marketplace() {
  const { sellersList, setSelectedSeller } = useEnergy();
  const navigate = useNavigate();

  const handleBuy = (seller) => {
    setSelectedSeller(seller);
    navigate('/upi');
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>🛒 Energy Marketplace</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Buy clean energy from verified sellers near you.</p>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['All', 'Solar', 'Biogas', 'Lowest Price', 'Nearest'].map(f => (
          <button key={f} className="px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: f === 'All' ? 'rgba(34,197,94,0.15)' : '#151f35', border: `1px solid ${f === 'All' ? '#22c55e' : '#1e2d4a'}`, color: f === 'All' ? '#22c55e' : '#64748b', cursor: 'pointer' }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
        {sellersList.map(seller => (
          <div key={seller.id} className="card-hover" style={cardStyle}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#22c55e22,#3b82f622)' }}>
                  <Zap size={16} color="#22c55e" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>{seller.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={10} /> {seller.location}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: '#facc15' }}>
                <Star size={12} fill="#facc15" /> {seller.rating}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '14px' }}>
              <MiniStat label="Available" value={`${seller.energy} kWh`} color="#22c55e" />
              <MiniStat label="Price/kWh" value={`₹${seller.price}`} color="#3b82f6" />
              <MiniStat label="Distance" value={`${seller.distance} km`} color="#a78bfa" />
            </div>

            {/* Availability bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>Availability</span>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>{Math.min(100, Math.round((seller.energy / 1600) * 100))}%</span>
              </div>
              <div style={{ height: '4px', background: '#0f1729', borderRadius: '99px' }}>
                <div style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg,#22c55e,#3b82f6)', width: `${Math.min(100, Math.round((seller.energy / 1600) * 100))}%` }} />
              </div>
            </div>

            <button
              onClick={() => handleBuy(seller)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: 'white', border: 'none', cursor: 'pointer' }}>
              <ShoppingCart size={14} /> Buy Energy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ background: '#0f1729', borderRadius: '10px', padding: '8px 10px', textAlign: 'center' }}>
      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: '700', color }}>{value}</div>
    </div>
  );
}
