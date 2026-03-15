import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sun, ShoppingBag, TrendingDown, Coins, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { smartMeterData } from '../data/mockData';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

// Aggregate to daily for display
const hourlySlice = smartMeterData.slice(0, 24 * 7); // first 7 days, hourly

export default function SmartMeter() {
  const [idx, setIdx] = useState(0);
  const [live, setLive] = useState(hourlySlice.slice(0, 12));
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx(prev => {
        const next = (prev + 1) % (hourlySlice.length - 12);
        setLive(hourlySlice.slice(next, next + 12));
        return next;
      });
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const current = live[live.length - 1] || hourlySlice[0];

  const metrics = [
    { icon: <Sun size={22} color="#facc15" />, label: 'Generated', value: `${current.solar_generation_kwh} kWh`, color: '#facc15', bg: 'rgba(250,204,21,0.1)' },
    { icon: <Zap size={22} color="#ef4444" />, label: 'Consumed', value: `${current.energy_consumption_kwh} kWh`, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    { icon: <TrendingUp size={22} color="#22c55e" />, label: 'Sold', value: `${current.energy_sold_kwh} kWh`, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { icon: <ShoppingBag size={22} color="#3b82f6" />, label: 'Bought', value: `${current.energy_bought_kwh} kWh`, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    { icon: <Coins size={22} color="#a78bfa" />, label: 'Wallet Credits', value: `${current.wallet_energy_credits} kWh`, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  ];

  return (
    <div className="fade-in">
      <div className="mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>⚡ Smart Meter Simulation</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Live simulated smart meter data updating every 3 seconds.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600' }}>LIVE</span>
        </div>
      </div>

      {/* Timestamp */}
      <div style={{ marginBottom: '16px', fontSize: '12px', color: '#64748b' }}>
        Current Reading: {current.label}
      </div>

      {/* Live metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px', marginBottom: '24px' }}>
        {metrics.map((m, i) => (
          <div key={i} className="card-hover fade-in" style={{ ...cardStyle, borderColor: `${m.color}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.icon}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>{m.label}</div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Generation vs Consumption */}
        <div style={cardStyle}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Generation vs Consumption (Last 12 Hours)</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={live}>
              <defs>
                <linearGradient id="gradSolar2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#facc15" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradConsume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
              <XAxis dataKey="hour" tickFormatter={h => `${h}:00`} tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Area type="monotone" dataKey="solar_generation_kwh" name="Solar Gen" stroke="#facc15" fill="url(#gradSolar2)" strokeWidth={2} />
              <Area type="monotone" dataKey="energy_consumption_kwh" name="Consumption" stroke="#ef4444" fill="url(#gradConsume)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Energy traded + wallet */}
        <div style={cardStyle}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Energy Traded & Wallet Credits</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={live}>
              <defs>
                <linearGradient id="gradSold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBought" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
              <XAxis dataKey="hour" tickFormatter={h => `${h}:00`} tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Area type="monotone" dataKey="energy_sold_kwh" name="Energy Sold" stroke="#22c55e" fill="url(#gradSold)" strokeWidth={2} />
              <Area type="monotone" dataKey="energy_bought_kwh" name="Energy Bought" stroke="#3b82f6" fill="url(#gradBought)" strokeWidth={2} />
              <Area type="monotone" dataKey="wallet_energy_credits" name="Credits" stroke="#a78bfa" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
