// Mock dataset and AI logic simulation for Market Intelligence

const generateHistoricalData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIndex = new Date().getMonth();
  
  const data = [];
  let baseSolarCost = 45000; // per kW
  let baseBiogasCost = 35000; // per m3

  // Generate for last 12 months
  for (let i = 11; i >= 0; i--) {
    let monthIdx = currentMonthIndex - i;
    let yearOffset = 0;
    if (monthIdx < 0) {
      monthIdx += 12;
      yearOffset = -1;
    }
    
    // Add some random fluctuation
    const solarFluctuation = (Math.random() - 0.5) * 2000 - (i * 500); // overall downward trend
    const biogasFluctuation = (Math.random() - 0.5) * 1500 + (i * 200); // overall slightly upward trend

    data.push({
      name: `${months[monthIdx]}`,
      solarCost: Math.round(baseSolarCost + solarFluctuation),
      biogasCost: Math.round(baseBiogasCost + biogasFluctuation),
      solarDemand: Math.round(500 + Math.random() * 200 + (11-i)*20),
      biogasDemand: Math.round(300 + Math.random() * 150),
    });
  }
  return data;
};

// Simulate Linear Regression to forecast next 3 months
export const predictTrends = (historicalData) => {
  const n = historicalData.length;
  if(n === 0) return [];
  
  let sumX = 0, sumY_solar = 0, sumXY_solar = 0, sumX2 = 0;
  let sumY_biogas = 0, sumXY_biogas = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY_solar += historicalData[i].solarCost;
    sumXY_solar += i * historicalData[i].solarCost;
    sumX2 += i * i;
    
    sumY_biogas += historicalData[i].biogasCost;
    sumXY_biogas += i * historicalData[i].biogasCost;
  }

  const slopeSolar = (n * sumXY_solar - sumX * sumY_solar) / (n * sumX2 - sumX * sumX);
  const interceptSolar = (sumY_solar - slopeSolar * sumX) / n;

  const slopeBiogas = (n * sumXY_biogas - sumX * sumY_biogas) / (n * sumX2 - sumX * sumX);
  const interceptBiogas = (sumY_biogas - slopeBiogas * sumX) / n;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIndex = new Date().getMonth();
  const predictions = [];

  for (let i = 1; i <= 3; i++) {
    const nextIdx = (currentMonthIndex + i) % 12;
    predictions.push({
      name: `${months[nextIdx]} (Est)`,
      solarCost: Math.round(slopeSolar * (n - 1 + i) + interceptSolar),
      biogasCost: Math.round(slopeBiogas * (n - 1 + i) + interceptBiogas),
      isForecast: true
    });
  }
  return predictions;
};

export const getMarketData = () => {
  const historical = generateHistoricalData();
  const forecast = predictTrends(historical);
  
  const currentSolar = historical[historical.length - 1].solarCost;
  const prevSolar = historical[historical.length - 2].solarCost;
  const currentBiogas = historical[historical.length - 1].biogasCost;
  
  return {
    combinedData: [...historical, ...forecast],
    historicalData: historical,
    forecastData: forecast,
    kpis: {
      avgSolarCost: currentSolar,
      solarTrendDir: currentSolar < prevSolar ? 'falling' : 'rising',
      solarTrendPercent: Math.abs(((currentSolar - prevSolar)/prevSolar) * 100).toFixed(1),
      avgBiogasCost: currentBiogas,
      roiEstimate: "4.5 Years", // fixed estimate for demo
      demandScore: 84
    },
    regionalDemand: [
      { region: "Maharashtra", solar: 85, biogas: 45 },
      { region: "Gujarat", solar: 92, biogas: 60 },
      { region: "Karnataka", solar: 78, biogas: 30 },
      { region: "Tamil Nadu", solar: 88, biogas: 20 },
      { region: "Punjab", solar: 40, biogas: 90 },
    ],
    recommendations: [
      "Optimal time to install Solar in Gujarat due to 15% state subsidy expiring in 2 months.",
      "Biogas adoption is surging in Punjab; highly recommended for industrial setups.",
      "Cost of solar panels is predicted to fall by 2% next quarter. Phased purchasing advised."
    ]
  };
};
