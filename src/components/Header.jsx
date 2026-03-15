import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, User, Wallet, Receipt, TrendingUp, ChevronDown, Bell } from 'lucide-react';
import { useEnergy } from '../context/EnergyContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const { walletBalance, energyCredits } = useEnergy();

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const profileItems = [
    { path: '/wallet', icon: Wallet, label: 'Energy Wallet' },
    { path: '/upi', icon: Receipt, label: 'UPI Transactions' },
    { path: '/analytics', icon: TrendingUp, label: 'Usage Analytics' },
  ];

  return (
    <header
      className="flex items-center justify-between px-6 py-3"
      style={{ background: '#0f1729', borderBottom: '1px solid #1e2d4a', height: '60px', flexShrink: 0 }}
    >
      {/* Platform status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-2 h-2">
            <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
          </div>
          <span className="text-xs font-medium" style={{ color: '#22c55e' }}>LIVE</span>
          <span className="text-xs" style={{ color: '#64748b' }}>Grid Online</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: '#151f35' }}>
          <Wifi size={12} style={{ color: '#3b82f6' }} />
          <span className="text-xs" style={{ color: '#64748b' }}>Smart Meter Connected</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3" ref={dropRef}>
        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-4 mr-2">
          <div className="text-right">
            <div className="text-xs" style={{ color: '#64748b' }}>Wallet</div>
            <div className="text-sm font-semibold" style={{ color: '#22c55e' }}>₹{walletBalance.toLocaleString('en-IN')}</div>
          </div>
          <div className="text-right">
            <div className="text-xs" style={{ color: '#64748b' }}>Credits</div>
            <div className="text-sm font-semibold" style={{ color: '#3b82f6' }}>{energyCredits} kWh</div>
          </div>
        </div>

        {/* Notifications */}
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: '#151f35', border: '1px solid #1e2d4a' }}
        >
          <Bell size={16} style={{ color: '#94a3b8' }} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
        </button>
        {notifOpen && (
          <div
            className="absolute top-14 right-16 w-72 rounded-xl p-3 z-50"
            style={{ background: '#151f35', border: '1px solid #1e2d4a', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            <div className="text-xs font-semibold mb-2" style={{ color: '#94a3b8' }}>NOTIFICATIONS</div>
            {['New installation request – Bangalore', 'Investment ROI credited – ₹12,800', 'Smart meter alert – high consumption'].map((n, i) => (
              <div key={i} className="flex items-center gap-2 py-2" style={{ borderBottom: i < 2 ? '1px solid #1e2d4a' : 'none' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e', flexShrink: 0 }} />
                <span className="text-xs" style={{ color: '#e2e8f0' }}>{n}</span>
              </div>
            ))}
          </div>
        )}

        {/* Profile dropdown */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: '#151f35', border: '1px solid #1e2d4a' }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)' }}>
            <User size={14} color="white" />
          </div>
          <span className="text-sm font-medium" style={{ color: '#e2e8f0' }}>Arjun Kumar</span>
          <ChevronDown size={14} style={{ color: '#64748b', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>

        {open && (
          <div
            className="absolute top-14 right-4 w-52 rounded-xl overflow-hidden z-50"
            style={{ background: '#151f35', border: '1px solid #1e2d4a', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #1e2d4a' }}>
              <div className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Arjun Kumar</div>
              <div className="text-xs" style={{ color: '#64748b' }}>arjun@energykart.in</div>
            </div>
            {profileItems.map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => { navigate(path); setOpen(false); }}
                className="sidebar-item w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ color: '#94a3b8', fontSize: '13px' }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
