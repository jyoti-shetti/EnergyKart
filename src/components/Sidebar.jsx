import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sun, Zap, BarChart2, Building2, ShoppingCart,
  Activity, Map, ChevronLeft, ChevronRight, Leaf, TrendingUp
} from 'lucide-react';

const navItems = [
  { path: '/analyzer', icon: Sun, label: 'Solar & Biogas Analyzer' },
  { path: '/installation', icon: Building2, label: 'Installation Portal' },
  { path: '/investor', icon: BarChart2, label: 'Investor Dashboard' },
  { path: '/company', icon: Zap, label: 'Company Dashboard' },
  { path: '/marketplace', icon: ShoppingCart, label: 'Energy Marketplace' },
  { path: '/smartmeter', icon: Activity, label: 'Smart Meter' },
  { path: '/matchmaking', icon: Map, label: 'AI Matchmaking' },
  { path: '/market-intelligence', icon: TrendingUp, label: 'Market Intelligence' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="relative flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '64px' : '240px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f1729 0%, #0a0f1a 100%)',
        borderRight: '1px solid #1e2d4a',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid #1e2d4a' }}>
        <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
          <Leaf size={18} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold text-sm" style={{ color: '#22c55e' }}>EnergyKart</div>
            <div className="text-xs" style={{ color: '#64748b' }}>Renewable Marketplace</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-hidden">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || (location.pathname === '/' && path === '/analyzer');
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-left ${isActive ? 'active' : ''}`}
              style={{
                background: isActive ? 'rgba(34,197,94,0.12)' : 'transparent',
                borderLeft: isActive ? '2px solid #22c55e' : '2px solid transparent',
                color: isActive ? '#22c55e' : '#94a3b8',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '400',
              }}
              title={collapsed ? label : ''}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -right-3 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: '#1e2d4a', border: '1px solid #22c55e44', color: '#22c55e', transform: 'translateY(-50%)' }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
