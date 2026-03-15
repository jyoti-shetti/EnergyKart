import React, { useState } from 'react';
import { TrendingUp, DollarSign, BarChart2, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEnergy } from '../context/EnergyContext';
import { activeInvestments } from '../data/mockData';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

export default function InvestorDashboard() {
  const { investmentOpps, fundedProjects, fundProject } = useEnergy();
  const [funded, setFunded] = useState({});
  const [tab, setTab] = useState('opportunities');

  const handleFund = (id) => {
    setFunded(f => ({ ...f, [id]: true }));
    fundProject(id);
  };

  const totalInvested = activeInvestments.reduce((s, i) => s + i.investedAmount, 0);
  const totalEarned = activeInvestments.reduce((s, i) => s + i.totalEarned, 0);

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>📈 Investor Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Discover renewable energy projects to fund and track your active portfolio.</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
        <SummaryCard icon={<DollarSign size={20} color="#22c55e" />} label="Total Invested" value={`₹${totalInvested.toLocaleString('en-IN')}`} color="#22c55e" />
        <SummaryCard icon={<TrendingUp size={20} color="#3b82f6" />} label="Total Earned" value={`₹${totalEarned.toLocaleString('en-IN')}`} color="#3b82f6" />
        <SummaryCard icon={<BarChart2 size={20} color="#a78bfa" />} label="Avg ROI" value={`${((totalEarned / totalInvested) * 100).toFixed(1)}%`} color="#a78bfa" />
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['opportunities', 'active'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: tab === t ? 'rgba(34,197,94,0.15)' : '#151f35',
              border: `1px solid ${tab === t ? '#22c55e' : '#1e2d4a'}`,
              color: tab === t ? '#22c55e' : '#64748b', cursor: 'pointer',
            }}>
            {t === 'opportunities' ? '🔍 Investment Opportunities' : '📊 Active Investments'}
          </button>
        ))}
      </div>

      {tab === 'opportunities' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '16px' }}>
          {investmentOpps.map(opp => (
            <div key={opp.id} className="card-hover" style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: opp.type === 'Solar' ? 'rgba(250,204,21,0.15)' : 'rgba(167,139,250,0.15)', color: opp.type === 'Solar' ? '#facc15' : '#a78bfa' }}>
                  {opp.type === 'Solar' ? '☀️' : '🌿'} {opp.type}
                </span>
                {opp.funded && <CheckCircle size={16} color="#22c55e" />}
              </div>
              <h3 className="font-semibold mb-1" style={{ color: '#e2e8f0' }}>{opp.location}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                <InfoRow label="Required Investment" value={`₹${opp.investment.toLocaleString('en-IN')}`} />
                <InfoRow label="Estimated ROI" value={`${opp.roi.toFixed(1)}%`} />
                <InfoRow label="Payback Period" value={`${opp.payback.toFixed(1)} yr`} />
                <InfoRow label="Capacity" value={`${opp.capacity} kW`} />
              </div>
              <button
                onClick={() => handleFund(opp.id)}
                disabled={funded[opp.id] || opp.funded}
                className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: funded[opp.id] || opp.funded ? 'rgba(34,197,94,0.1)' : 'linear-gradient(135deg,#22c55e,#16a34a)',
                  color: funded[opp.id] || opp.funded ? '#22c55e' : 'white',
                  border: funded[opp.id] || opp.funded ? '1px solid #22c55e' : 'none',
                  cursor: funded[opp.id] || opp.funded ? 'default' : 'pointer',
                }}>
                {funded[opp.id] || opp.funded ? '✅ Invested!' : '💰 Invest in Project'}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeInvestments.map(inv => (
            <div key={inv.id} style={cardStyle}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: inv.type === 'Solar' ? 'rgba(250,204,21,0.15)' : 'rgba(167,139,250,0.15)', color: inv.type === 'Solar' ? '#facc15' : '#a78bfa' }}>
                      {inv.type === 'Solar' ? '☀️' : '🌿'} {inv.type}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>Active</span>
                  </div>
                  <h3 className="font-semibold" style={{ color: '#e2e8f0' }}>{inv.location} — {inv.company}</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '24px', textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Invested</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#e2e8f0' }}>₹{inv.investedAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Earned</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e' }}>₹{inv.totalEarned.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>ROI</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6' }}>{((inv.totalEarned / inv.investedAmount) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>MONTHLY EARNINGS (₹)</div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={inv.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '8px', color: '#e2e8f0' }} formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon, label, value, color }) {
  return (
    <div style={{ background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '14px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>{icon}</div>
        <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>{value}</div>
    </div>
  );
}
