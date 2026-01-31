// Calculator Input Types

export interface BasicInputs {
  employees: number;
  typingHoursPerDay: number;
  typingSpeedWPM: number;
  voiceSpeedWPM: number;
  labourRatePerHour: number;
  softwareCostPerMonth: number;
  deploymentCost: number;
}

export interface AdvancedInputs {
  workingDaysPerYear: number;
  adoptionRatePercent: number;
  accuracyImpactPercent: number;
  proofreadingOverheadPercent: number;
}

export interface CalculatorInputs extends BasicInputs, AdvancedInputs {}

// Calculator Output Types

export interface TimeMetrics {
  dailyHoursSavedPerPerson: number;
  weeklyHoursSavedPerPerson: number;
  monthlyHoursSavedPerPerson: number;
  annualHoursSavedPerPerson: number;
  annualHoursSavedTotal: number;
}

export interface FinancialMetrics {
  annualProductivityValue: number;
  annualSoftwareCost: number;
  annualNetSavings: number;
  monthlyNetSavings: number;
}

export interface ROIMetrics {
  annualROIPercent: number;
  monthsToBreakeven: number;
  threeYearTotalInvestment: number;
  threeYearTotalSavings: number;
  threeYearNetBenefit: number;
}

export interface OrganisationMetrics {
  effectiveEmployeesEquivalent: number;
  totalProductivityGainPercent: number;
}

export interface CalculatorOutputs {
  time: TimeMetrics;
  financial: FinancialMetrics;
  roi: ROIMetrics;
  organisation: OrganisationMetrics;
  isPositiveROI: boolean;
}

// Preset Types

export type PresetId = 'solo' | 'team' | 'company' | 'custom';

export interface Preset {
  id: PresetId;
  label: string;
  description: string;
  values: Partial<CalculatorInputs>;
}

// Form State

export interface CalculatorState {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
  activePreset: PresetId;
  showAdvanced: boolean;
  email: string;
  hasSubmittedEmail: boolean;
}

// Chart Data Types

export interface ComparisonDataPoint {
  label: string;
  typing: number;
  voice: number;
}

export interface ThreeYearDataPoint {
  year: string;
  investment: number;
  savings: number;
  cumulative: number;
}
