import React, { useState } from 'react';
import { Sun, Leaf, AlertTriangle, Zap, Cloud, BarChart2, TrendingUp } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const cardStyle = {
  background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px',
};

const inputStyle = {
  width: '100%', background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '10px',
  padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none',
};

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '500', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' };

export default function Analyzer() {
  const [form, setForm] = useState({ city: 'Bangalore', roofArea: 120, monthlyKwh: 350, wasteKg: 40, people: 4 });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      const roofArea = parseFloat(form.roofArea);
      const wasteKg = parseFloat(form.wasteKg);
      const monthlyKwh = parseFloat(form.monthlyKwh);

      const solarCapacity = parseFloat((roofArea * 0.18).toFixed(2));
      const expectedGen = parseFloat((solarCapacity * 4.5 * 30).toFixed(1));
      const cloudFactor = parseFloat((0.7 + Math.random() * 0.3).toFixed(2));
      const adjustedGen = parseFloat((expectedGen * cloudFactor).toFixed(1));

      const biogasOutput = parseFloat((wasteKg * 0.04).toFixed(2));
      const elecEquivalent = parseFloat((biogasOutput * 6).toFixed(2));

      const totalGen = adjustedGen + elecEquivalent * 30;
      const shortage = monthlyKwh - totalGen;
      const shortagePct = shortage > 0 ? Math.min(100, Math.round((shortage / monthlyKwh) * 100)) : 0;

      setResults({ solarCapacity, expectedGen, adjustedGen, cloudFactor, biogasOutput, elecEquivalent, shortagePct, totalGen });
      setLoading(false);
    }, 800);
  };

  const radarData = results ? [
    { subject: 'Solar Capacity', A: Math.min(100, (results.solarCapacity / 25) * 100) },
    { subject: 'Net Generation', A: Math.min(100, (results.adjustedGen / 800) * 100) },
    { subject: 'Biogas Output', A: Math.min(100, (results.biogasOutput / 5) * 100) },
    { subject: 'Self-Sufficiency', A: 100 - results.shortagePct },
    { subject: 'Elec Equiv', A: Math.min(100, (results.elecEquivalent / 10) * 100) },
  ] : [];

  const barData = results ? [
    { name: 'Expected Solar', value: results.expectedGen, fill: '#facc15' },
    { name: 'Adjusted Solar', value: results.adjustedGen, fill: '#22c55e' },
    { name: 'Monthly Demand', value: parseFloat(form.monthlyKwh), fill: '#3b82f6' },
    { name: 'Elec Equiv/mo', value: parseFloat((results.elecEquivalent * 30).toFixed(1)), fill: '#a78bfa' },
  ] : [];

  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>☀️ Solar & Biogas Analyzer</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Estimate your renewable energy potential based on your location and resources.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px' }}>
        {/* Form */}
        <div style={cardStyle}>
          <div className="text-sm font-semibold mb-4" style={{ color: '#94a3b8' }}>ANALYSIS INPUTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>City / Location</label>
              <input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="e.g. Bangalore" />
            </div>
            <div>
              <label style={labelStyle}>Roof Area (m²)</label>
              <input name="roofArea" type="number" value={form.roofArea} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Monthly Electricity (kWh)</label>
              <input name="monthlyKwh" type="number" value={form.monthlyKwh} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Organic Waste per Day (kg)</label>
              <input name="wasteKg" type="number" value={form.wasteKg} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Number of People</label>
              <input name="people" type="number" value={form.people} onChange={handleChange} style={inputStyle} />
            </div>
            <button
              onClick={analyze}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm mt-2 transition-all"
              style={{
                background: loading ? '#1e2d4a' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: loading ? '#64748b' : 'white',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '⚙️ Analyzing...' : '🔍 Analyze Potential'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          {!results ? (
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
              <Sun size={48} style={{ color: '#22c55e', opacity: 0.3, marginBottom: '12px' }} />
              <p style={{ color: '#64748b', textAlign: 'center' }}>Fill the form and click <strong style={{ color: '#22c55e' }}>Analyze Potential</strong> to see your renewable energy results.</p>
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <StatCard icon={<Sun size={20} color="#facc15" />} label="Recommended Solar Capacity" value={`${results.solarCapacity} kW`} sub={`Based on ${form.roofArea} m² roof`} color="#facc15" />
                <StatCard icon={<Zap size={20} color="#22c55e" />} label="Est. Solar Generation" value={`${results.adjustedGen} kWh/mo`} sub={`Cloud factor: ${results.cloudFactor}`} color="#22c55e" />
                <StatCard icon={<Leaf size={20} color="#a78bfa" />} label="Biogas Production" value={`${results.biogasOutput} m³/day`} sub={`${form.wasteKg} kg organic waste`} color="#a78bfa" />
                <StatCard icon={<Cloud size={20} color="#38bdf8" />} label="Electricity Equivalent" value={`${results.elecEquivalent} kWh/day`} sub="From biogas" color="#38bdf8" />
              </div>
              {/* Shortage card */}
              <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: results.shortagePct > 30 ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', flexShrink: 0 }}>
                  <AlertTriangle size={22} style={{ color: results.shortagePct > 30 ? '#ef4444' : '#22c55e' }} />
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>Predicted Energy Shortage Probability</div>
                  <div className="text-2xl font-bold" style={{ color: results.shortagePct > 30 ? '#ef4444' : '#22c55e' }}>{results.shortagePct}%</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>
                    {results.shortagePct === 0 ? '✅ Your renewable setup covers full demand!' : `${results.shortagePct}% chance of energy shortfall – consider grid backup.`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      {results && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={cardStyle}>
            <div className="text-sm font-semibold mb-4" style={{ color: '#94a3b8' }}>ENERGY PROFILE RADAR</div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2d4a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Radar dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.25} dot={{ fill: '#22c55e' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={cardStyle}>
            <div className="text-sm font-semibold mb-4" style={{ color: '#94a3b8' }}>MONTHLY ENERGY BREAKDOWN (kWh)</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="card-hover" style={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '14px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          {icon}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      </div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{sub}</div>
    </div>
  );
}
