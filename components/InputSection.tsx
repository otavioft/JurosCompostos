
import React from 'react';
import { RateType, PeriodType } from '../types';

interface InputSectionProps {
  initialValue: number;
  setInitialValue: (v: number) => void;
  monthlyValue: number;
  setMonthlyValue: (v: number) => void;
  interestRate: number;
  setInterestRate: (v: number) => void;
  rateType: RateType;
  setRateType: (v: RateType) => void;
  period: number;
  setPeriod: (v: number) => void;
  periodType: PeriodType;
  setPeriodType: (v: PeriodType) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  initialValue, setInitialValue,
  monthlyValue, setMonthlyValue,
  interestRate, setInterestRate,
  rateType, setRateType,
  period, setPeriod,
  periodType, setPeriodType
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Parâmetros</h2>
      
      <div className="space-y-5">
        {/* Valor Inicial */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Aporte Inicial (R$)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
            <input 
              type="number" 
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Valor Mensal */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Aporte Mensal (R$)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
            <input 
              type="number" 
              value={monthlyValue}
              onChange={(e) => setMonthlyValue(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Taxa de Juros (%)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <select 
              value={rateType}
              onChange={(e) => setRateType(e.target.value as RateType)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            >
              <option value={RateType.ANNUAL}>Anual</option>
              <option value={RateType.MONTHLY}>Mensal</option>
            </select>
          </div>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Período</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <select 
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as PeriodType)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            >
              <option value={PeriodType.YEARS}>Anos</option>
              <option value={PeriodType.MONTHS}>Meses</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
