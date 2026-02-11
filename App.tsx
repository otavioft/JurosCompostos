
import React, { useState, useMemo, useEffect } from 'react';
import { RateType, PeriodType, CalculationResult, SummaryData } from './types';
import InputSection from './components/InputSection';
import SummaryCards from './components/SummaryCards';
import ChartSection from './components/ChartSection';
import TableSection from './components/TableSection';
import GeminiAnalysis from './components/GeminiAnalysis';

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyValue, setMonthlyValue] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [rateType, setRateType] = useState<RateType>(RateType.ANNUAL);
  const [period, setPeriod] = useState<number>(5);
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.YEARS);

  const results: CalculationResult[] = useMemo(() => {
    const data: CalculationResult[] = [];
    
    let totalMonths = periodType === PeriodType.YEARS ? period * 12 : period;
    let monthlyRate = rateType === RateType.ANNUAL 
      ? Math.pow(1 + interestRate / 100, 1/12) - 1 
      : interestRate / 100;

    let currentAmount = initialValue;
    let totalInvested = initialValue;
    let totalInterest = 0;

    // Month 0
    data.push({
      month: 0,
      totalInvested: initialValue,
      totalInterest: 0,
      totalAmount: initialValue,
      monthlyInterest: 0,
      contribution: 0
    });

    for (let m = 1; m <= totalMonths; m++) {
      const interestForThisMonth = currentAmount * monthlyRate;
      currentAmount += interestForThisMonth + monthlyValue;
      totalInvested += monthlyValue;
      totalInterest += interestForThisMonth;

      data.push({
        month: m,
        totalInvested,
        totalInterest,
        totalAmount: currentAmount,
        monthlyInterest: interestForThisMonth,
        contribution: monthlyValue
      });
    }

    return data;
  }, [initialValue, monthlyValue, interestRate, rateType, period, periodType]);

  const summary: SummaryData = useMemo(() => {
    const lastResult = results[results.length - 1];
    return {
      totalAmount: lastResult.totalAmount,
      totalInvested: lastResult.totalInvested,
      totalInterest: lastResult.totalInterest,
      yieldPercentage: (lastResult.totalInterest / lastResult.totalInvested) * 100
    };
  }, [results]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-8 shadow-lg mb-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-inner">
              <i className="fa-solid fa-chart-line text-indigo-700 text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Simulador Pro</h1>
              <p className="text-indigo-100 text-sm">Calculadora de Juros Compostos</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="bg-indigo-600 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
              Investimento Inteligente
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            <InputSection 
              initialValue={initialValue} setInitialValue={setInitialValue}
              monthlyValue={monthlyValue} setMonthlyValue={setMonthlyValue}
              interestRate={interestRate} setInterestRate={setInterestRate}
              rateType={rateType} setRateType={setRateType}
              period={period} setPeriod={setPeriod}
              periodType={periodType} setPeriodType={setPeriodType}
            />
            
            <GeminiAnalysis summary={summary} period={period} periodType={periodType} />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-8">
            <SummaryCards summary={summary} />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-chart-area text-indigo-500"></i>
                Evolução Patrimonial
              </h3>
              <ChartSection results={results} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-table text-indigo-500"></i>
                Detalhamento Mensal
              </h3>
              <TableSection results={results} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
