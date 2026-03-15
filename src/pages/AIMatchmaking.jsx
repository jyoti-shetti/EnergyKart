import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, MapPin, Zap, ShoppingCart } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';
import { useNavigate } from 'react-router-dom';

// Fix Leaflet default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function rankSellers(sellers) {
  return [...sellers]
    .sort((a, b) => {
      const scoreA = (1 / a.price) * 0.4 + (1 / (a.distance + 0.1)) * 0.35 + (a.energy / 1600) * 0.25;
      const scoreB = (1 / b.price) * 0.4 + (1 / (b.distance + 0.1)) * 0.35 + (b.energy / 1600) * 0.25;
      return scoreB - scoreA;
    })
    .slice(0, 5);
}

export default function AIMatchmaking() {
  const { sellersList, setSelectedSeller } = useEnergy();
  const navigate = useNavigate();
  const [highlighted, setHighlighted] = useState(null);
  const topSellers = rankSellers(sellersList);
  const center = [20.5937, 78.9629]; // India center

  const handleBuy = (seller) => {
    setSelectedSeller(seller);
    navigate('/upi');
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>🤖 AI Energy Matchmaking</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>AI-ranked best sellers near you on an interactive map.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', height: '580px' }}>
        {/* Map */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e2d4a' }}>
          <MapContainer center={center} zoom={5} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {sellersList.map(seller => (
              <Marker
                key={seller.id}
                position={[seller.lat, seller.lng]}
                icon={highlighted === seller.id ? activeIcon : defaultIcon}
                eventHandlers={{ click: () => setHighlighted(seller.id) }}
              >
                <Popup>
                  <div style={{ minWidth: '160px' }}>
                    <strong style={{ color: '#1e3a5f' }}>{seller.name}</strong>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>📍 {seller.location}</div>
                    <div style={{ fontSize: '12px' }}>⚡ {seller.energy} kWh</div>
                    <div style={{ fontSize: '12px' }}>💰 ₹{seller.price}/kWh</div>
                    <div style={{ fontSize: '12px' }}>📏 {seller.distance} km</div>
                    <button
                      onClick={() => handleBuy(seller)}
                      style={{ marginTop: '8px', padding: '4px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                      Buy Energy
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Ranked sellers panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🏆 Best Sellers Near You
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '-6px', marginBottom: '4px' }}>Ranked by price, distance & availability</div>
          {topSellers.map((seller, rank) => (
            <div
              key={seller.id}
              className="card-hover"
              onClick={() => setHighlighted(seller.id)}
              style={{
                background: highlighted === seller.id ? 'rgba(34,197,94,0.1)' : '#151f35',
                border: `1px solid ${highlighted === seller.id ? '#22c55e' : '#1e2d4a'}`,
                borderRadius: '14px', padding: '14px', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: rank === 0 ? '#facc15' : rank === 1 ? '#94a3b8' : rank === 2 ? '#cd7c2e' : '#475569' }}>#{rank + 1}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{seller.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <MapPin size={9} /> {seller.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#facc15', fontSize: '11px' }}>
                  <Star size={10} fill="#facc15" /> {seller.rating}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px', marginBottom: '10px' }}>
                {[
                  { l: 'Energy', v: `${seller.energy}kWh`, c: '#22c55e' },
                  { l: 'Price', v: `₹${seller.price}`, c: '#3b82f6' },
                  { l: 'Distance', v: `${seller.distance}km`, c: '#a78bfa' },
                ].map(s => (
                  <div key={s.l} style={{ background: '#0f1729', borderRadius: '8px', padding: '5px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>{s.l}</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleBuy(seller); }}
                className="w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: 'white', border: 'none', cursor: 'pointer' }}>
                <ShoppingCart size={12} /> Buy Energy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
