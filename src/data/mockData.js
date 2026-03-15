// ============================================================
// EnergyKart Mock Data Layer
// ============================================================

// ------ Energy Sellers ------
export const sellers = [
  { id: 1, name: 'SunVolt Pvt Ltd', energy: 850, price: 5.2, location: 'Bangalore', lat: 12.9716, lng: 77.5946, distance: 1.2, rating: 4.8 },
  { id: 2, name: 'GreenGrid Energy', energy: 1200, price: 4.9, location: 'Pune', lat: 18.5204, lng: 73.8567, distance: 2.8, rating: 4.6 },
  { id: 3, name: 'EcoWatt Solutions', energy: 430, price: 5.8, location: 'Mumbai', lat: 19.0760, lng: 72.8777, distance: 3.1, rating: 4.4 },
  { id: 4, name: 'BioEnergy Hub', energy: 680, price: 4.5, location: 'Hyderabad', lat: 17.3850, lng: 78.4867, distance: 0.9, rating: 4.9 },
  { id: 5, name: 'SolarPeak Co.', energy: 920, price: 5.5, location: 'Chennai', lat: 13.0827, lng: 80.2707, distance: 4.5, rating: 4.3 },
  { id: 6, name: 'WindStar Energy', energy: 340, price: 6.1, location: 'Jaipur', lat: 26.9124, lng: 75.7873, distance: 5.2, rating: 4.1 },
  { id: 7, name: 'CleanPower India', energy: 1550, price: 4.7, location: 'Delhi', lat: 28.6139, lng: 77.2090, distance: 6.8, rating: 4.7 },
  { id: 8, name: 'ReGenerate Co.', energy: 270, price: 5.0, location: 'Ahmedabad', lat: 23.0225, lng: 72.5714, distance: 7.1, rating: 4.5 },
  { id: 9, name: 'TerraWatt Tech', energy: 1100, price: 4.3, location: 'Kolkata', lat: 22.5726, lng: 88.3639, distance: 8.3, rating: 4.8 },
  { id: 10, name: 'NovaSolar Ltd', energy: 780, price: 5.3, location: 'Surat', lat: 21.1702, lng: 72.8311, distance: 9.6, rating: 4.2 },
];

// ------ Investment Opportunities ------
export const investmentOpportunities = [
  { id: 1, type: 'Solar', location: 'Bangalore', investment: 250000, roi: 18.5, payback: 5.4, capacity: 25, demand: 380 },
  { id: 2, type: 'Biogas', location: 'Pune', investment: 180000, roi: 14.2, payback: 7.0, capacity: 12, demand: 200 },
  { id: 3, type: 'Solar', location: 'Chennai', investment: 320000, roi: 21.0, payback: 4.8, capacity: 35, demand: 520 },
  { id: 4, type: 'Biogas', location: 'Hyderabad', investment: 140000, roi: 16.8, payback: 5.9, capacity: 8, demand: 150 },
  { id: 5, type: 'Solar', location: 'Mumbai', investment: 450000, roi: 19.5, payback: 5.1, capacity: 50, demand: 720 },
  { id: 6, type: 'Biogas', location: 'Delhi', investment: 200000, roi: 15.4, payback: 6.5, capacity: 15, demand: 280 },
  { id: 7, type: 'Solar', location: 'Jaipur', investment: 175000, roi: 22.3, payback: 4.5, capacity: 20, demand: 310 },
  { id: 8, type: 'Biogas', location: 'Ahmedabad', investment: 120000, roi: 13.9, payback: 7.2, capacity: 9, demand: 170 },
];

// ------ Active Investments ------
export const activeInvestments = [
  {
    id: 1, location: 'Bangalore', type: 'Solar', company: 'SunVolt Pvt Ltd',
    investedAmount: 250000, totalEarned: 87500,
    monthlyData: [
      { month: 'Sep', revenue: 10200 }, { month: 'Oct', revenue: 11800 },
      { month: 'Nov', revenue: 10900 }, { month: 'Dec', revenue: 9800 },
      { month: 'Jan', revenue: 12100 }, { month: 'Feb', revenue: 13200 },
      { month: 'Mar', revenue: 12800 },
    ],
  },
  {
    id: 2, location: 'Pune', type: 'Biogas', company: 'GreenGrid Energy',
    investedAmount: 180000, totalEarned: 42000,
    monthlyData: [
      { month: 'Sep', revenue: 5200 }, { month: 'Oct', revenue: 5800 },
      { month: 'Nov', revenue: 6100 }, { month: 'Dec', revenue: 6400 },
      { month: 'Jan', revenue: 6800 }, { month: 'Feb', revenue: 5900 },
      { month: 'Mar', revenue: 5800 },
    ],
  },
  {
    id: 3, location: 'Chennai', type: 'Solar', company: 'SolarPeak Co.',
    investedAmount: 320000, totalEarned: 128000,
    monthlyData: [
      { month: 'Sep', revenue: 16200 }, { month: 'Oct', revenue: 17800 },
      { month: 'Nov', revenue: 18200 }, { month: 'Dec', revenue: 16900 },
      { month: 'Jan', revenue: 19400 }, { month: 'Feb', revenue: 20100 },
      { month: 'Mar', revenue: 19400 },
    ],
  },
];

// ------ Installation Requests (Company Dashboard) ------
export const initialInstallationRequests = [
  { id: 1, location: 'Whitefield, Bangalore', type: 'Solar', capacity: 15, demand: 280, area: 120, bill: 4200, budget: 180000, financing: 'Investor-funded', status: 'pending' },
  { id: 2, location: 'Kothrud, Pune', type: 'Biogas', capacity: 8, demand: 140, waste: 45, bill: 2100, budget: 130000, financing: 'Self-funded', status: 'pending' },
  { id: 3, location: 'Andheri, Mumbai', type: 'Solar', capacity: 22, demand: 420, area: 180, bill: 6300, budget: 280000, financing: 'Energy-as-a-service', status: 'pending' },
  { id: 4, location: 'Begumpet, Hyderabad', type: 'Biogas', capacity: 6, demand: 110, waste: 30, bill: 1800, budget: 95000, financing: 'Investor-funded', status: 'pending' },
  { id: 5, location: 'T Nagar, Chennai', type: 'Solar', capacity: 18, demand: 340, area: 150, bill: 5100, budget: 220000, financing: 'Self-funded', status: 'pending' },
];

// ------ Wallet Transactions ------
export const initialTransactions = [
  { id: 1, type: 'sell', description: 'Energy sold to GreenGrid', amount: 850, kwh: 163.5, date: '2026-03-14', time: '14:32' },
  { id: 2, type: 'buy', description: 'Purchased from SunVolt Pvt Ltd', amount: -1040, kwh: 200, date: '2026-03-13', time: '09:15' },
  { id: 3, type: 'sell', description: 'Energy sold to BioEnergy Hub', amount: 630, kwh: 140, date: '2026-03-12', time: '17:48' },
  { id: 4, type: 'earn', description: 'Investment ROI – Bangalore Solar', amount: 12800, kwh: 0, date: '2026-03-10', time: '00:00' },
  { id: 5, type: 'buy', description: 'Purchased from EcoWatt Solutions', amount: -696, kwh: 120, date: '2026-03-09', time: '11:22' },
  { id: 6, type: 'sell', description: 'Energy sold to CleanPower India', amount: 470, kwh: 100, date: '2026-03-08', time: '15:10' },
  { id: 7, type: 'buy', description: 'Purchased from TerraWatt Tech', amount: -473, kwh: 110, date: '2026-03-07', time: '08:55' },
  { id: 8, type: 'earn', description: 'Investment ROI – Chennai Solar', amount: 19400, kwh: 0, date: '2026-03-05', time: '00:00' },
  { id: 9, type: 'sell', description: 'Energy sold to SolarPeak Co.', amount: 330, kwh: 60, date: '2026-03-03', time: '13:40' },
  { id: 10, type: 'buy', description: 'Purchased from NovaSolar Ltd', amount: -530, kwh: 100, date: '2026-03-01', time: '10:00' },
];

// ------ Smart Meter Data Generation ------
function generateSmartMeterData() {
  const data = [];
  const start = new Date('2026-02-13T00:00:00');
  let credits = 120;

  for (let day = 0; day < 30; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const ts = new Date(start);
      ts.setDate(start.getDate() + day);
      ts.setHours(hour);

      // Solar generation (6 AM – 6 PM only)
      let solar = 0;
      if (hour >= 6 && hour <= 18) {
        const peak = Math.exp(-0.5 * Math.pow((hour - 13) / 2.5, 2));
        solar = parseFloat((peak * 4.2 * (0.8 + Math.random() * 0.4)).toFixed(2));
      }

      // Consumption is base + morning/evening peaks
      const morningPeak = Math.exp(-0.5 * Math.pow((hour - 8) / 1.5, 2)) * 2.1;
      const eveningPeak = Math.exp(-0.5 * Math.pow((hour - 20) / 1.5, 2)) * 2.8;
      const consumed = parseFloat((0.8 + morningPeak + eveningPeak + Math.random() * 0.5).toFixed(2));

      const surplus = solar - consumed;
      const sold = surplus > 0 ? parseFloat((surplus * 0.6).toFixed(2)) : 0;
      const bought = surplus < 0 ? parseFloat((Math.abs(surplus) * 0.5).toFixed(2)) : 0;

      credits = parseFloat((credits + sold * 0.3 - bought * 0.2).toFixed(2));
      if (credits < 0) credits = 0;

      data.push({
        timestamp: ts.toISOString(),
        day,
        hour,
        label: `${ts.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} ${String(hour).padStart(2, '0')}:00`,
        solar_generation_kwh: solar,
        energy_consumption_kwh: consumed,
        energy_sold_kwh: sold,
        energy_bought_kwh: bought,
        wallet_energy_credits: credits,
      });
    }
  }
  return data;
}

export const smartMeterData = generateSmartMeterData();

// ------ Usage Analytics (daily aggregations) ------
export const dailyAnalytics = (() => {
  const days = {};
  smartMeterData.forEach(r => {
    const key = `Day ${r.day + 1}`;
    if (!days[key]) {
      days[key] = { name: key, solar: 0, consumption: 0, sold: 0, bought: 0, credits: 0 };
    }
    days[key].solar += r.solar_generation_kwh;
    days[key].consumption += r.energy_consumption_kwh;
    days[key].sold += r.energy_sold_kwh;
    days[key].bought += r.energy_bought_kwh;
    days[key].credits = r.wallet_energy_credits;
  });
  return Object.values(days).map(d => ({
    ...d,
    solar: parseFloat(d.solar.toFixed(1)),
    consumption: parseFloat(d.consumption.toFixed(1)),
    sold: parseFloat(d.sold.toFixed(1)),
    bought: parseFloat(d.bought.toFixed(1)),
    credits: parseFloat(d.credits.toFixed(1)),
  }));
})();
