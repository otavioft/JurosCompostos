
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface ChartSectionProps {
  results: CalculationResult[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ results }) => {
  const formatValue = (value: number) => 
    new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="w-full h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={results}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={{ stroke: '#cbd5e1' }} 
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={{ stroke: '#cbd5e1' }}
            dy={10}
          />
          <YAxis 
            axisLine={{ stroke: '#cbd5e1' }} 
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={{ stroke: '#cbd5e1' }}
            tickFormatter={(v) => formatValue(v)}
          />
          <Tooltip 
             formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
             contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend 
            verticalAlign="top" 
            align="center" 
            iconType="circle" 
            wrapperStyle={{ paddingBottom: '40px', fontSize: '12px', fontWeight: 600 }}
          />
          <Line 
            type="monotone" 
            dataKey="totalAmount" 
            name="Total Acumulado" 
            stroke="#1e40af" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="totalInvested" 
            name="Capital Investido" 
            stroke="#94a3b8" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3, strokeWidth: 1, fill: 'white' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
