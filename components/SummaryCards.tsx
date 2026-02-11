
import React from 'react';
import { SummaryData } from '../types';

interface SummaryCardsProps {
  summary: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Valor Total Final - Azul Principal */}
      <div className="bg-primary text-white p-6 rounded-md shadow-md text-center transform hover:scale-[1.02] transition-transform">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Valor total acumulado</p>
        <p className="text-2xl font-black">{formatCurrency(summary.totalAmount)}</p>
      </div>

      {/* Total Investido */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Investido (Capital)</p>
        <p className="text-2xl font-black text-slate-800">{formatCurrency(summary.totalInvested)}</p>
      </div>

      {/* Total em Juros */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Rendimento em Juros</p>
        <p className="text-2xl font-black text-emerald-600">{formatCurrency(summary.totalInterest)}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
