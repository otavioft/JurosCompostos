import type { FormData, MonthlyData, CalculationResult } from '../types';

export const calculateCompoundInterest = (formData: FormData): CalculationResult => {
  const { initialValue, monthlyValue, interestRate, rateType, period, periodType } = formData;

  const monthlyRate = rateType === 'yearly' ? Math.pow(1 + interestRate / 100, 1 / 12) - 1 : interestRate / 100;
  const totalMonths = periodType === 'years' ? period * 12 : period;

  let accumulatedValue = initialValue;
  let totalInvested = initialValue;
  let totalInterest = 0;
  const monthlyData: MonthlyData[] = [];

  // Month 0 state
  monthlyData.push({
    month: 0,
    interest: 0,
    totalInvested: initialValue,
    totalInterest: 0,
    totalAccumulated: initialValue,
  });

  for (let m = 1; m <= totalMonths; m++) {
    // 1. Calculate interest on the value accumulated from the previous month.
    const interestForMonth = accumulatedValue * monthlyRate;
    accumulatedValue += interestForMonth;
    totalInterest += interestForMonth;

    // 2. Add the monthly contribution after interest has been calculated.
    accumulatedValue += monthlyValue;
    totalInvested += monthlyValue;

    monthlyData.push({
      month: m,
      interest: interestForMonth,
      totalInvested: totalInvested,
      totalInterest: totalInterest,
      totalAccumulated: accumulatedValue,
    });
  }
  
  // If there are no monthly contributions and only an initial value
  if (totalMonths === 0) {
      return {
          finalAmount: initialValue,
          totalInvested: initialValue,
          totalInterest: 0,
          monthlyData: [monthlyData[0]],
      };
  }

  return {
    finalAmount: accumulatedValue,
    totalInvested: totalInvested,
    totalInterest: totalInterest,
    monthlyData,
  };
};