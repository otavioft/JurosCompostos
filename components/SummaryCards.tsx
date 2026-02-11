
import React from 'react';
import { SummaryData } from '../types';

interface SummaryCardsProps {
  summary: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Investido */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-blue-400">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Investido</p>
        <p className="text-2xl font-bold text-slate-800">{formatCurrency(summary.totalInvested)}</p>
        <p className="text-xs text-slate-500 mt-2">Soma de todos os aportes</p>
      </div>

      {/* Total em Juros */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-400">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total em Juros</p>
        <p className="text-2xl font-bold text-emerald-600">{formatCurrency(summary.totalInterest)}</p>
        <p className="text-xs text-emerald-500 mt-2">Rendimento de {summary.yieldPercentage.toFixed(1)}%</p>
      </div>

      {/* Valor Total */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-600">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Valor Total Final</p>
        <p className="text-2xl font-bold text-indigo-700">{formatCurrency(summary.totalAmount)}</p>
        <p className="text-xs text-indigo-500 mt-2">Montante acumulado</p>
      </div>
    </div>
  );
};

export default SummaryCards;
