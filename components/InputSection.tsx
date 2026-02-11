
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
  onClear: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  initialValue, setInitialValue,
  monthlyValue, setMonthlyValue,
  interestRate, setInterestRate,
  rateType, setRateType,
  period, setPeriod,
  periodType, setPeriodType,
  onClear
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Valor Inicial */}
        <div>
          <label className="block text-sm text-slate-500 font-semibold mb-2 uppercase tracking-tight text-[11px]">Valor inicial</label>
          <div className="flex h-11">
            <span className="flex items-center px-4 input-addon rounded-l-md font-medium text-sm">R$</span>
            <input 
              type="number" 
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e.target.value))}
              className="flex-1 px-4 custom-input outline-none focus:border-primary rounded-r-md transition-colors"
            />
          </div>
        </div>

        {/* Valor Mensal */}
        <div>
          <label className="block text-sm text-slate-500 font-semibold mb-2 uppercase tracking-tight text-[11px]">Valor mensal</label>
          <div className="flex h-11">
            <span className="flex items-center px-4 input-addon rounded-l-md font-medium text-sm">R$</span>
            <input 
              type="number" 
              value={monthlyValue}
              onChange={(e) => setMonthlyValue(Number(e.target.value))}
              className="flex-1 px-4 custom-input outline-none focus:border-primary rounded-r-md transition-colors"
            />
          </div>
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="block text-sm text-slate-500 font-semibold mb-2 uppercase tracking-tight text-[11px]">Taxa de juros</label>
          <div className="flex h-11">
            <span className="flex items-center px-4 input-addon rounded-l-md font-medium text-sm">%</span>
            <input 
              type="number" 
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="flex-1 px-4 custom-input outline-none focus:border-primary transition-colors"
            />
            <select 
              value={rateType}
              onChange={(e) => setRateType(e.target.value as RateType)}
              className="px-4 custom-select rounded-r-md text-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <option value={RateType.ANNUAL}>anual</option>
              <option value={RateType.MONTHLY}>mensal</option>
            </select>
          </div>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm text-slate-500 font-semibold mb-2 uppercase tracking-tight text-[11px]">Período</label>
          <div className="flex h-11">
            <input 
              type="number" 
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="flex-1 px-4 border border-slate-300 rounded-l-md outline-none focus:border-primary transition-colors"
            />
            <select 
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as PeriodType)}
              className="px-4 border border-l-0 border-slate-300 rounded-r-md text-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <option value={PeriodType.YEARS}>ano(s)</option>
              <option value={PeriodType.MONTHS}>mes(es)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button 
          className="bg-primary text-white px-10 py-2.5 rounded-md font-bold hover:bg-blue-800 transition-colors shadow-sm"
        >
          Calcular
        </button>
        <div className="flex gap-6 text-sm">
          <button className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">Configurações Avançadas</button>
          <button onClick={onClear} className="text-slate-400 hover:text-slate-600 font-medium transition-colors">Limpar campos</button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
