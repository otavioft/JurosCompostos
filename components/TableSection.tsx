
import React, { useState } from 'react';
import { CalculationResult } from '../types';

interface TableSectionProps {
  results: CalculationResult[];
}

const TableSection: React.FC<TableSectionProps> = ({ results }) => {
  const [showAll, setShowAll] = useState(false);
  const displayResults = showAll ? results : results.slice(0, 13); // Show first year by default

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 border-y border-slate-200 text-slate-800 font-semibold uppercase tracking-wider text-[10px]">
          <tr>
            <th className="px-4 py-3">Mês</th>
            <th className="px-4 py-3">Investido Acumulado</th>
            <th className="px-4 py-3">Juros no Mês</th>
            <th className="px-4 py-3">Juros Acumulados</th>
            <th className="px-4 py-3">Total Acumulado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {displayResults.map((row) => (
            <tr key={row.month} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900">{row.month}</td>
              <td className="px-4 py-3">{formatCurrency(row.totalInvested)}</td>
              <td className="px-4 py-3 text-emerald-600">+{formatCurrency(row.monthlyInterest)}</td>
              <td className="px-4 py-3">{formatCurrency(row.totalInterest)}</td>
              <td className="px-4 py-3 font-semibold text-indigo-700">{formatCurrency(row.totalAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {results.length > 13 && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors flex items-center gap-2 mx-auto"
          >
            {showAll ? (
              <>Ver menos <i className="fa-solid fa-chevron-up"></i></>
            ) : (
              <>Ver período completo ({results.length} meses) <i className="fa-solid fa-chevron-down"></i></>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableSection;
