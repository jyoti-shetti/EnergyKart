import React, { useState } from 'react';
import { Building2, CheckCircle, Send } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';
import { useNavigate } from 'react-router-dom';

const cardStyle = { background: '#151f35', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '24px' };
const inputStyle = { width: '100%', background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '500', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' };

const initialForm = { projectType: 'Solar', location: '', area: '', waste: '', bill: '', budget: '', financing: 'Self-funded' };

export default function InstallationPortal() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const { addInstallationRequest } = useEnergy();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.location || !form.bill || !form.budget) return;
    addInstallationRequest({ ...form, area: parseFloat(form.area) || 0, waste: parseFloat(form.waste) || 0, bill: parseFloat(form.bill), budget: parseFloat(form.budget) });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
          <CheckCircle size={40} color="#22c55e" />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Request Submitted!</h2>
        <p style={{ color: '#64748b', textAlign: 'center', maxWidth: '400px' }}>
          Your installation request has been forwarded to the <strong style={{ color: '#22c55e' }}>Investor Dashboard</strong> and <strong style={{ color: '#3b82f6' }}>Company Dashboard</strong>.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={() => navigate('/investor')} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer' }}>View Investor Dashboard</button>
          <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#151f35', color: '#94a3b8', border: '1px solid #1e2d4a', cursor: 'pointer' }}>Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e2e8f0' }}>🏗️ Installation Request Portal</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Submit a request for solar or biogas installation. Your request will be visible to investors and companies.</p>
      </div>

      <form onSubmit={handleSubmit} style={cardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          {/* Project Type */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Project Type</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Solar Installation', 'Biogas Plant'].map(t => (
                <button
                  key={t} type="button"
                  onClick={() => setForm(f => ({ ...f, projectType: t.split(' ')[0] }))}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: form.projectType === t.split(' ')[0] ? 'rgba(34,197,94,0.15)' : '#0f1729',
                    border: `1px solid ${form.projectType === t.split(' ')[0] ? '#22c55e' : '#1e2d4a'}`,
                    color: form.projectType === t.split(' ')[0] ? '#22c55e' : '#64748b',
                    cursor: 'pointer',
                  }}
                >
                  {t.split(' ')[0] === 'Solar' ? '☀️' : '🌿'} {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Location / City</label>
            <input name="location" value={form.location} onChange={handleChange} required style={inputStyle} placeholder="e.g. Whitefield, Bangalore" />
          </div>

          {form.projectType === 'Solar' ? (
            <div>
              <label style={labelStyle}>Roof Area (m²)</label>
              <input name="area" type="number" value={form.area} onChange={handleChange} style={inputStyle} placeholder="120" />
            </div>
          ) : (
            <div>
              <label style={labelStyle}>Organic Waste / Day (kg)</label>
              <input name="waste" type="number" value={form.waste} onChange={handleChange} style={inputStyle} placeholder="40" />
            </div>
          )}

          <div>
            <label style={labelStyle}>Monthly Electricity Bill (₹)</label>
            <input name="bill" type="number" value={form.bill} onChange={handleChange} required style={inputStyle} placeholder="4500" />
          </div>

          <div>
            <label style={labelStyle}>Budget (₹)</label>
            <input name="budget" type="number" value={form.budget} onChange={handleChange} required style={inputStyle} placeholder="200000" />
          </div>

          {/* Financing */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Financing Preference</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
              {['Self-funded', 'Investor-funded', 'Energy-as-a-service'].map(f => (
                <button
                  key={f} type="button"
                  onClick={() => setForm(prev => ({ ...prev, financing: f }))}
                  className="py-3 px-3 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: form.financing === f ? 'rgba(59,130,246,0.15)' : '#0f1729',
                    border: `1px solid ${form.financing === f ? '#3b82f6' : '#1e2d4a'}`,
                    color: form.financing === f ? '#3b82f6' : '#64748b',
                    cursor: 'pointer', textAlign: 'center',
                  }}
                >
                  {f === 'Self-funded' ? '💰' : f === 'Investor-funded' ? '📈' : '♻️'} {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          <Send size={16} /> Submit Installation Request
        </button>
      </form>
    </div>
  );
}
