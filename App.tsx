
import React, { useState, useMemo } from 'react';
import { RateType, PeriodType, CalculationResult, SummaryData } from './types';
import InputSection from './components/InputSection';
import SummaryCards from './components/SummaryCards';
import ChartSection from './components/ChartSection';
import TableSection from './components/TableSection';
import GeminiAnalysis from './components/GeminiAnalysis';

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyValue, setMonthlyValue] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(9);
  const [rateType, setRateType] = useState<RateType>(RateType.ANNUAL);
  const [period, setPeriod] = useState<number>(15);
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

  const handleClear = () => {
    setInitialValue(0);
    setMonthlyValue(0);
    setInterestRate(0);
    setPeriod(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Tema Azul */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
               <i className="fa-solid fa-chart-line text-2xl"></i>
               <span>Simulador Financeiro</span>
            </div>
            
            <div className="hidden md:flex relative items-center">
              <input 
                type="text" 
                placeholder="Pesquisar calculadoras e indicadores..." 
                className="bg-white/10 text-white placeholder:text-white/60 text-xs py-2 px-10 rounded-md w-64 outline-none border border-white/20 focus:bg-white focus:text-gray-800 transition-all"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-white/50 text-sm"></i>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-200 transition-colors">Notícias</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Investimentos</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Calculadoras</a>
            <button className="bg-white text-primary px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors font-bold shadow-sm">
              Falar com consultor
            </button>
            <a href="#" className="hover:text-blue-200 transition-colors border-l border-white/20 pl-6">Entrar</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-12 max-w-5xl">
        {/* Input Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-primary mb-8">Simulador de Juros Compostos</h2>
          
          <InputSection 
            initialValue={initialValue} setInitialValue={setInitialValue}
            monthlyValue={monthlyValue} setMonthlyValue={setMonthlyValue}
            interestRate={interestRate} setInterestRate={setInterestRate}
            rateType={rateType} setRateType={setRateType}
            period={period} setPeriod={setPeriod}
            periodType={periodType} setPeriodType={setPeriodType}
            onClear={handleClear}
          />
        </div>

        {/* Results Title */}
        <h2 className="text-xl font-bold text-primary mb-6 px-2">Resultado da Simulação</h2>

        <div className="space-y-10">
          <SummaryCards summary={summary} />
          
          <div className="bg-white p-8 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-center font-bold text-primary mb-8 uppercase text-xs tracking-widest">Gráfico de Evolução</h3>
            <ChartSection results={results} />
          </div>

          <div className="bg-white p-8 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-center font-bold text-primary mb-8 uppercase text-xs tracking-widest">Detalhamento Mensal</h3>
            <TableSection results={results} />
          </div>

          <GeminiAnalysis summary={summary} period={period} periodType={periodType} />
        </div>
      </main>
    </div>
  );
};

export default App;
