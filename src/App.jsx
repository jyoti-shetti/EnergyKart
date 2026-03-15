import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnergyProvider } from './context/EnergyContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Analyzer from './pages/Analyzer';
import InstallationPortal from './pages/InstallationPortal';
import InvestorDashboard from './pages/InvestorDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import Marketplace from './pages/Marketplace';
import SmartMeter from './pages/SmartMeter';
import AIMatchmaking from './pages/AIMatchmaking';
import EnergyWallet from './pages/EnergyWallet';
import UPITransactions from './pages/UPITransactions';
import UsageAnalytics from './pages/UsageAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <EnergyProvider>
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0a0f1a' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Header />
            <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/analyzer" replace />} />
                <Route path="/analyzer" element={<Analyzer />} />
                <Route path="/installation" element={<InstallationPortal />} />
                <Route path="/investor" element={<InvestorDashboard />} />
                <Route path="/company" element={<CompanyDashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/smartmeter" element={<SmartMeter />} />
                <Route path="/matchmaking" element={<AIMatchmaking />} />
                <Route path="/wallet" element={<EnergyWallet />} />
                <Route path="/upi" element={<UPITransactions />} />
                <Route path="/analytics" element={<UsageAnalytics />} />
              </Routes>
            </main>
          </div>
        </div>
      </EnergyProvider>
    </BrowserRouter>
  );
}
