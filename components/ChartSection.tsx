
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface ChartSectionProps {
  results: CalculationResult[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ results }) => {
  const formatValue = (value: number) => 
    new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-lg">
          <p className="font-bold text-slate-700 mb-2">Mês {label}</p>
          <div className="space-y-1">
            <p className="text-sm text-blue-600">
              Investido: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value)}
            </p>
            <p className="text-sm text-emerald-600">
              Juros: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[1].value)}
            </p>
            <div className="pt-1 mt-1 border-t border-slate-100">
              <p className="text-sm font-bold text-indigo-700">
                Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value + payload[1].value)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={results}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}}
            tickFormatter={formatValue}
          />
          <Tooltip content={customTooltip} />
          <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
          <Area 
            type="monotone" 
            dataKey="totalInvested" 
            name="Total Investido" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorInvested)" 
            stackId="1"
          />
          <Area 
            type="monotone" 
            dataKey="totalInterest" 
            name="Total Juros" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorInterest)" 
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
