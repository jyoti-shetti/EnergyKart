import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  sellers as initialSellers,
  initialInstallationRequests,
  investmentOpportunities as initialOpportunities,
  initialTransactions,
} from '../data/mockData';

const EnergyContext = createContext(null);

export function EnergyProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(48350);
  const [energyCredits, setEnergyCredits] = useState(342.8);
  const [sellersList, setSellersList] = useState(initialSellers);
  const [installationRequests, setInstallationRequests] = useState(initialInstallationRequests);
  const [investmentOpps, setInvestmentOpps] = useState(initialOpportunities);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [fundedProjects, setFundedProjects] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const addInstallationRequest = useCallback((req) => {
    const newReq = {
      ...req,
      id: Date.now(),
      status: 'pending',
      capacity: Math.floor(req.area ? req.area * 0.18 : req.waste * 0.04 * 6),
      demand: Math.floor(req.bill / 7),
    };
    setInstallationRequests(prev => [newReq, ...prev]);
    // Also add to investment opportunities if investor-funded
    if (req.financing === 'Investor-funded') {
      setInvestmentOpps(prev => [{
        id: Date.now(),
        type: req.projectType,
        location: req.location,
        investment: req.budget,
        roi: 16 + Math.random() * 8,
        payback: 4.5 + Math.random() * 3,
        capacity: newReq.capacity,
        demand: newReq.demand,
      }, ...prev]);
    }
  }, []);

  const acceptProject = useCallback((reqId) => {
    setInstallationRequests(prev =>
      prev.map(r => r.id === reqId ? { ...r, status: 'accepted' } : r)
    );
    const req = installationRequests.find(r => r.id === reqId);
    if (req) setAcceptedProjects(prev => [{ ...req, status: 'accepted' }, ...prev]);
  }, [installationRequests]);

  const fundProject = useCallback((oppId) => {
    setInvestmentOpps(prev =>
      prev.map(o => o.id === oppId ? { ...o, funded: true } : o)
    );
    setFundedProjects(prev => {
      const opp = investmentOpps.find(o => o.id === oppId);
      return opp ? [{ ...opp, funded: true }, ...prev] : prev;
    });
  }, [investmentOpps]);

  const buyEnergy = useCallback((sellerId, kwh) => {
    const seller = sellersList.find(s => s.id === sellerId);
    if (!seller) return { success: false, error: 'Seller not found' };
    const total = kwh * seller.price;
    if (walletBalance < total) return { success: false, error: 'Insufficient balance' };
    if (seller.energy < kwh) return { success: false, error: 'Insufficient energy available' };

    setWalletBalance(prev => parseFloat((prev - total).toFixed(2)));
    setEnergyCredits(prev => parseFloat((prev + kwh).toFixed(2)));
    setSellersList(prev => prev.map(s => s.id === sellerId ? { ...s, energy: parseFloat((s.energy - kwh).toFixed(1)) } : s));
    setTransactions(prev => [{
      id: Date.now(), type: 'buy',
      description: `Purchased from ${seller.name}`,
      amount: -parseFloat(total.toFixed(2)), kwh,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }, ...prev]);
    return { success: true, total };
  }, [sellersList, walletBalance]);

  const sellEnergy = useCallback((kwh, price) => {
    if (energyCredits < kwh) return { success: false, error: 'Insufficient energy credits' };
    const revenue = parseFloat((kwh * price).toFixed(2));
    setEnergyCredits(prev => parseFloat((prev - kwh).toFixed(2)));
    setWalletBalance(prev => parseFloat((prev + revenue).toFixed(2)));
    setSellersList(prev => [{
      id: Date.now(), name: 'You (surplus)', energy: kwh, price,
      location: 'Local', distance: 0, rating: 5, lat: 12.9716, lng: 77.5946,
    }, ...prev]);
    setTransactions(prev => [{
      id: Date.now(), type: 'sell',
      description: 'Surplus energy listed',
      amount: revenue, kwh,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }, ...prev]);
    return { success: true, revenue };
  }, [energyCredits]);

  return (
    <EnergyContext.Provider value={{
      walletBalance, energyCredits,
      sellersList, installationRequests, investmentOpps, transactions,
      acceptedProjects, fundedProjects, selectedSeller,
      setSelectedSeller,
      addInstallationRequest, acceptProject, fundProject,
      buyEnergy, sellEnergy,
    }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error('useEnergy must be used within EnergyProvider');
  return ctx;
}
