import React, { useState } from 'react';
import { Bell, CheckCircle, Phone, X } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '20px' };

export default function CompanyDashboard() {
  const { installationRequests, acceptProject, acceptedProjects } = useEnergy();
  const [tab, setTab] = useState('requests');

  const pending = installationRequests.filter(r => r.status === 'pending');
  const accepted = installationRequests.filter(r => r.status === 'accepted');

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>🏭 Company Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Manage installation requests and track active installations.</p>
      </div>

      {/* Alert banner */}
      {pending.length > 0 && (
        <div className="fade-in" style={{ ...cardStyle, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bell size={20} color="#22c55e" />
          <span style={{ color: '#22c55e', fontWeight: '600' }}>
            {pending.length} New Installation Request{pending.length > 1 ? 's' : ''} Pending
          </span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['requests', 'active'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-xl text-sm font-semibold relative"
            style={{
              background: tab === t ? 'rgba(59,130,246,0.15)' : '#151f35',
              border: `1px solid ${tab === t ? '#3b82f6' : '#1e2d4a'}`,
              color: tab === t ? '#3b82f6' : '#64748b', cursor: 'pointer',
            }}>
            {t === 'requests' ? `📋 New Requests (${pending.length})` : `⚡ Active Installations (${accepted.length})`}
          </button>
        ))}
      </div>

      {tab === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {pending.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '48px' }}>
              <CheckCircle size={40} color="#22c55e" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: '#64748b' }}>No pending requests. All caught up!</p>
            </div>
          ) : (
            pending.map(req => (
              <div key={req.id} className="card-hover" style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <span className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{ background: req.type === 'Solar' ? 'rgba(250,204,21,0.15)' : 'rgba(167,139,250,0.15)', color: req.type === 'Solar' ? '#facc15' : '#a78bfa' }}>
                        {req.type === 'Solar' ? '☀️' : '🌿'} {req.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>Pending</span>
                    </div>
                    <h3 className="font-semibold mb-1" style={{ color: '#e2e8f0' }}>{req.location}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '8px', marginTop: '10px' }}>
                      <InfoRow label="Est. Capacity" value={`${req.capacity || 'N/A'} kW`} />
                      <InfoRow label="Monthly Demand" value={`${req.demand} kWh`} />
                      <InfoRow label="Budget" value={`₹${(req.budget / 1000).toFixed(0)}k`} />
                      <InfoRow label="Financing" value={req.financing || 'N/A'} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => acceptProject(req.id)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer' }}>
                      <CheckCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />Accept
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ background: '#0f1729', color: '#3b82f6', border: '1px solid #3b82f6', cursor: 'pointer' }}>
                      <Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />Contact
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'active' && (
        <div>
          {accepted.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '48px' }}>
              <p style={{ color: '#64748b' }}>No accepted installations yet. Accept requests from the New Requests tab.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2d4a' }}>
                    {['Location', 'Type', 'Capacity', 'Monthly Demand', 'Budget', 'Financing', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accepted.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #1e2d4a' }}>
                      <td style={{ padding: '12px', color: '#e2e8f0' }}>{r.location}</td>
                      <td style={{ padding: '12px' }}><span style={{ color: r.type === 'Solar' ? '#facc15' : '#a78bfa' }}>{r.type === 'Solar' ? '☀️' : '🌿'} {r.type}</span></td>
                      <td style={{ padding: '12px', color: '#e2e8f0' }}>{r.capacity || 'N/A'} kW</td>
                      <td style={{ padding: '12px', color: '#e2e8f0' }}>{r.demand} kWh</td>
                      <td style={{ padding: '12px', color: '#22c55e' }}>₹{r.budget.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', color: '#94a3b8' }}>{r.financing}</td>
                      <td style={{ padding: '12px' }}><span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>✅ Accepted</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{value}</div>
    </div>
  );
}
