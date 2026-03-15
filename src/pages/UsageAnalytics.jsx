import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { dailyAnalytics } from '../data/mockData';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

const LINES = [
  { key: 'solar', name: 'Solar Generation', color: '#facc15', stroke: '#facc15' },
  { key: 'consumption', name: 'Consumption', color: '#ef4444', stroke: '#ef4444' },
  { key: 'sold', name: 'Energy Sold', color: '#22c55e', stroke: '#22c55e' },
  { key: 'bought', name: 'Energy Bought', color: '#3b82f6', stroke: '#3b82f6' },
  { key: 'credits', name: 'Wallet Credits', color: '#a78bfa', stroke: '#a78bfa' },
];

export default function UsageAnalytics() {
  const [selected, setSelected] = useState(['solar', 'consumption', 'sold']);
  const [range, setRange] = useState(30);

  const data = dailyAnalytics.slice(0, range);

  const totals = {
    solar: data.reduce((s, d) => s + d.solar, 0).toFixed(1),
    consumption: data.reduce((s, d) => s + d.consumption, 0).toFixed(1),
    sold: data.reduce((s, d) => s + d.sold, 0).toFixed(1),
    bought: data.reduce((s, d) => s + d.bought, 0).toFixed(1),
  };

  const toggle = (key) => setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>📊 Energy Usage Analytics</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Your 30-day energy performance and trends.</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { l: 'Total Solar Gen', v: `${totals.solar} kWh`, c: '#facc15' },
          { l: 'Total Consumed', v: `${totals.consumption} kWh`, c: '#ef4444' },
          { l: 'Total Sold', v: `${totals.sold} kWh`, c: '#22c55e' },
          { l: 'Total Bought', v: `${totals.bought} kWh`, c: '#3b82f6' },
        ].map(s => (
          <div key={s.l} style={{ background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>{s.l}</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[7, 14, 30].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: range === r ? 'rgba(59,130,246,0.15)' : '#151f35', border: `1px solid ${range === r ? '#3b82f6' : '#1e2d4a'}`, color: range === r ? '#3b82f6' : '#64748b', cursor: 'pointer' }}>
              {r}D
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LINES.map(l => (
            <button key={l.key} onClick={() => toggle(l.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              style={{ background: selected.includes(l.key) ? `${l.color}18` : '#151f35', border: `1px solid ${selected.includes(l.key) ? l.color : '#1e2d4a'}`, color: selected.includes(l.key) ? l.color : '#64748b', cursor: 'pointer' }}>
              <span style={{ width: '10px', height: '3px', background: l.color, display: 'inline-block', borderRadius: '2px' }} />
              {l.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main line chart */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Daily Energy (kWh)</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={(v, i) => i % 5 === 0 ? v : ''} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
            {LINES.filter(l => selected.includes(l.key)).map(l => (
              <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Wallet credits trend */}
      <div style={cardStyle}>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Wallet Credit Trend (kWh)</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="credGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={(v, i) => i % 5 === 0 ? v : ''} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} />
            <Area type="monotone" dataKey="credits" name="Credits" stroke="#a78bfa" fill="url(#credGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
