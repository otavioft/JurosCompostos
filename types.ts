
export enum RateType {
  ANNUAL = 'ANNUAL',
  MONTHLY = 'MONTHLY'
}

export enum PeriodType {
  YEARS = 'YEARS',
  MONTHS = 'MONTHS'
}

export interface CalculationResult {
  month: number;
  totalInvested: number;
  totalInterest: number;
  totalAmount: number;
  monthlyInterest: number;
  contribution: number;
}

export interface SummaryData {
  totalAmount: number;
  totalInvested: number;
  totalInterest: number;
  yieldPercentage: number;
}
