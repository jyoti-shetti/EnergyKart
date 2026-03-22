import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingDown, TrendingUp, Minus, Lightbulb, MapPin, Activity, DollarSign } from 'lucide-react';
import { getMarketData } from '../data/marketIntelligenceData';

export default function MarketIntelligence() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate an API call
    const fetchData = () => {
      const result = getMarketData();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <Activity className="animate-spin mr-2" /> Loading AI Insights...
      </div>
    );
  }

  const { combinedData, historicalData, kpis, regionalDemand, recommendations } = data;

  const TrendIcon = kpis.solarTrendDir === 'falling' ? TrendingDown : kpis.solarTrendDir === 'rising' ? TrendingUp : Minus;
  const trendColor = kpis.solarTrendDir === 'falling' ? 'text-green-500' : kpis.solarTrendDir === 'rising' ? 'text-red-500' : 'text-gray-400';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Market Intelligence</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time market trends, forecasting & insights.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
          <Activity size={16} /> Market Data Live Status: Synced
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Avg Cost */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400 text-sm font-medium">Avg Solar Install Cost</p>
            <div className="p-2 bg-gray-800/50 rounded-lg"><DollarSign size={16} className="text-emerald-400" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">₹{kpis.avgSolarCost.toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-1">/ kW</span></h3>
          <div className={`flex items-center text-sm ${trendColor}`}>
            <TrendIcon size={16} className="mr-1" />
            <span>{kpis.solarTrendPercent}% this month</span>
          </div>
        </div>

        {/* Trend Direction */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400 text-sm font-medium">Solar Cost Trend</p>
            <div className="p-2 bg-gray-800/50 rounded-lg"><TrendingDown size={16} className="text-blue-400" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1 capitalize">{kpis.solarTrendDir}</h3>
          <p className="text-sm text-gray-400">Projected to continue</p>
        </div>

        {/* ROI Estimate */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400 text-sm font-medium">Estimated ROI Time</p>
            <div className="p-2 bg-gray-800/50 rounded-lg"><Activity size={16} className="text-purple-400" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{kpis.roiEstimate}</h3>
          <p className="text-sm text-gray-400">Based on avg system size</p>
        </div>

        {/* Demand Score */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400 text-sm font-medium">National Demand Score</p>
            <div className="p-2 bg-gray-800/50 rounded-lg"><MapPin size={16} className="text-orange-400" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{kpis.demandScore} / 100</h3>
          <p className="text-sm text-gray-400">High aggregate interest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Chart */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Price Trend Forecast (AI Regression)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`₹${value}`, 'Cost']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="solarCost" 
                    name="Solar Cost (₹/kW)" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="biogasCost" 
                    name="Biogas Cost (₹/m³)" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Historical Demand Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    cursor={{fill: '#374151', opacity: 0.4}}
                  />
                  <Legend />
                  <Bar dataKey="solarDemand" name="Solar Enquiries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="biogasDemand" name="Biogas Enquiries" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Heatmap & Recommendations */}
        <div className="space-y-6 text-white">
          
          {/* AI Recommendations Module */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Lightbulb size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-indigo-100">AI Recommendations</h3>
            </div>
            <ul className="space-y-4">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/20">
                  <div className="mt-1 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                  <p className="text-sm text-indigo-100/80 leading-relaxed">{rec}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Heatmap module (Simple Table approach) */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-gray-400" />
              <h3 className="text-lg font-bold">Regional Demand Heatmap</h3>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 pb-2 border-b border-gray-800">
                <div>REGION</div>
                <div className="text-right">SOLAR IDX</div>
                <div className="text-right">BIOGAS IDX</div>
              </div>
              {regionalDemand.map((region, i) => (
                <div key={i} className="grid grid-cols-3 items-center py-2 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/20 transition-colors">
                  <div className="text-sm font-medium">{region.region}</div>
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-xs">{region.solar}</span>
                    <div className="w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${region.solar}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-xs">{region.biogas}</span>
                    <div className="w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${region.biogas}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
