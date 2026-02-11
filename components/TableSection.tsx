
import React, { useState } from 'react';
import { CalculationResult } from '../types';

interface TableSectionProps {
  results: CalculationResult[];
}

const TableSection: React.FC<TableSectionProps> = ({ results }) => {
  const [showAll, setShowAll] = useState(false);
  const displayResults = showAll ? results : results.slice(0, 10);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="overflow-hidden border border-slate-200 rounded-md">
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-widest">Mês</th>
              <th className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-widest">Juros no Período</th>
              <th className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-widest">Capital Acumulado</th>
              <th className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-widest">Juros Acumulados</th>
              <th className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-widest">Saldo Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {displayResults.map((row) => (
              <tr key={row.month} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 text-slate-900 font-medium">{row.month}</td>
                <td className="px-6 py-4 text-emerald-600">+{formatCurrency(row.monthlyInterest)}</td>
                <td className="px-6 py-4 text-slate-500">{formatCurrency(row.totalInvested)}</td>
                <td className="px-6 py-4 text-slate-500">{formatCurrency(row.totalInterest)}</td>
                <td className="px-6 py-4 font-bold text-primary">{formatCurrency(row.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-primary font-bold text-[11px] uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-2"
        >
          {showAll ? 'Recolher dados' : `Mostrar todos os ${results.length} meses`}
          <i className={`fa-solid fa-chevron-${showAll ? 'up' : 'down'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default TableSection;
