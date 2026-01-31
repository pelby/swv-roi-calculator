import type {
  CalculatorInputs,
  CalculatorOutputs,
  TimeMetrics,
  FinancialMetrics,
  ROIMetrics,
  OrganisationMetrics,
  ComparisonDataPoint,
  ThreeYearDataPoint,
} from '../types/calculator';

/**
 * Core calculation: Time saved per hour of typing work
 * Formula: 1 - (typingSpeed / voiceSpeed) adjusted for overheads
 */
function calculateTimeSavingsRatio(inputs: CalculatorInputs): number {
  const { typingSpeedWPM, voiceSpeedWPM, accuracyImpactPercent, proofreadingOverheadPercent } = inputs;

  // Base time savings from speed difference
  const baseRatio = 1 - typingSpeedWPM / voiceSpeedWPM;

  // Reduce by accuracy and proofreading overheads
  const accuracyFactor = 1 - accuracyImpactPercent / 100;
  const proofreadingFactor = 1 - proofreadingOverheadPercent / 100;

  // Net savings ratio (can't be negative)
  return Math.max(0, baseRatio * accuracyFactor * proofreadingFactor);
}

/**
 * Calculate time metrics
 */
function calculateTimeMetrics(inputs: CalculatorInputs): TimeMetrics {
  const { employees, typingHoursPerDay, workingDaysPerYear, adoptionRatePercent } = inputs;

  const timeSavingsRatio = calculateTimeSavingsRatio(inputs);
  const adoptionFactor = adoptionRatePercent / 100;

  // Hours saved per person
  const dailyHoursSavedPerPerson = typingHoursPerDay * timeSavingsRatio * adoptionFactor;
  const weeklyHoursSavedPerPerson = dailyHoursSavedPerPerson * 5;
  const monthlyHoursSavedPerPerson = dailyHoursSavedPerPerson * (workingDaysPerYear / 12);
  const annualHoursSavedPerPerson = dailyHoursSavedPerPerson * workingDaysPerYear;

  // Total hours saved across organisation
  const annualHoursSavedTotal = annualHoursSavedPerPerson * employees;

  return {
    dailyHoursSavedPerPerson,
    weeklyHoursSavedPerPerson,
    monthlyHoursSavedPerPerson,
    annualHoursSavedPerPerson,
    annualHoursSavedTotal,
  };
}

/**
 * Calculate financial metrics
 */
function calculateFinancialMetrics(
  inputs: CalculatorInputs,
  timeMetrics: TimeMetrics
): FinancialMetrics {
  const { employees, labourRatePerHour, softwareCostPerMonth } = inputs;

  // Value of time saved
  const annualProductivityValue = timeMetrics.annualHoursSavedTotal * labourRatePerHour;

  // Software costs
  const annualSoftwareCost = employees * softwareCostPerMonth * 12;

  // Net savings
  const annualNetSavings = annualProductivityValue - annualSoftwareCost;
  const monthlyNetSavings = annualNetSavings / 12;

  return {
    annualProductivityValue,
    annualSoftwareCost,
    annualNetSavings,
    monthlyNetSavings,
  };
}

/**
 * Calculate ROI metrics
 */
function calculateROIMetrics(
  inputs: CalculatorInputs,
  financialMetrics: FinancialMetrics
): ROIMetrics {
  const { employees, softwareCostPerMonth, deploymentCost } = inputs;

  // First year investment
  const firstYearInvestment = deploymentCost + employees * softwareCostPerMonth * 12;

  // Annual ROI
  const annualROIPercent =
    firstYearInvestment > 0
      ? ((financialMetrics.annualNetSavings + deploymentCost) / firstYearInvestment) * 100
      : 0;

  // Months to breakeven
  const monthlyInvestment = employees * softwareCostPerMonth;
  const monthlyProductivityValue = financialMetrics.annualProductivityValue / 12;
  const monthlyNetBenefit = monthlyProductivityValue - monthlyInvestment;

  let monthsToBreakeven = Infinity;
  if (monthlyNetBenefit > 0) {
    monthsToBreakeven = deploymentCost / monthlyNetBenefit;
  }

  // 3-year projections
  const annualSoftwareCost = employees * softwareCostPerMonth * 12;
  const threeYearTotalInvestment = deploymentCost + annualSoftwareCost * 3;
  const threeYearTotalSavings = financialMetrics.annualProductivityValue * 3;
  const threeYearNetBenefit = threeYearTotalSavings - threeYearTotalInvestment;

  return {
    annualROIPercent,
    monthsToBreakeven,
    threeYearTotalInvestment,
    threeYearTotalSavings,
    threeYearNetBenefit,
  };
}

/**
 * Calculate organisation-level metrics
 */
function calculateOrganisationMetrics(
  inputs: CalculatorInputs,
  timeMetrics: TimeMetrics
): OrganisationMetrics {
  const { employees, typingHoursPerDay, workingDaysPerYear } = inputs;

  // Total working hours per year per person
  const annualWorkingHours = 8 * workingDaysPerYear; // Assuming 8-hour workday

  // Effective employees equivalent (hours saved = X% of a full-time employee)
  const effectiveEmployeesEquivalent = timeMetrics.annualHoursSavedTotal / annualWorkingHours;

  // Productivity gain as percentage of typing time
  const totalTypingHours = employees * typingHoursPerDay * workingDaysPerYear;
  const totalProductivityGainPercent =
    totalTypingHours > 0 ? (timeMetrics.annualHoursSavedTotal / totalTypingHours) * 100 : 0;

  return {
    effectiveEmployeesEquivalent,
    totalProductivityGainPercent,
  };
}

/**
 * Main calculation function - computes all outputs from inputs
 */
export function calculateAll(inputs: CalculatorInputs): CalculatorOutputs {
  const time = calculateTimeMetrics(inputs);
  const financial = calculateFinancialMetrics(inputs, time);
  const roi = calculateROIMetrics(inputs, financial);
  const organisation = calculateOrganisationMetrics(inputs, time);

  return {
    time,
    financial,
    roi,
    organisation,
    isPositiveROI: financial.annualNetSavings > 0,
  };
}

/**
 * Generate comparison chart data (typing vs voice)
 */
export function generateComparisonData(inputs: CalculatorInputs): ComparisonDataPoint[] {
  const { typingHoursPerDay, workingDaysPerYear, adoptionRatePercent } = inputs;

  const timeSavingsRatio = calculateTimeSavingsRatio(inputs);
  const adoptionFactor = adoptionRatePercent / 100;

  const typingDaily = typingHoursPerDay;
  const voiceDaily = typingHoursPerDay * (1 - timeSavingsRatio * adoptionFactor);

  const typingWeekly = typingDaily * 5;
  const voiceWeekly = voiceDaily * 5;

  const typingMonthly = typingDaily * (workingDaysPerYear / 12);
  const voiceMonthly = voiceDaily * (workingDaysPerYear / 12);

  return [
    { label: 'Daily', typing: typingDaily, voice: voiceDaily },
    { label: 'Weekly', typing: typingWeekly, voice: voiceWeekly },
    { label: 'Monthly', typing: typingMonthly, voice: voiceMonthly },
  ];
}

/**
 * Generate 3-year projection chart data
 */
export function generateThreeYearData(
  inputs: CalculatorInputs,
  financial: FinancialMetrics
): ThreeYearDataPoint[] {
  const { employees, softwareCostPerMonth, deploymentCost } = inputs;
  const annualSoftwareCost = employees * softwareCostPerMonth * 12;

  const data: ThreeYearDataPoint[] = [];
  let cumulativeNet = 0;

  for (let year = 1; year <= 3; year++) {
    const investment = year === 1 ? deploymentCost + annualSoftwareCost : annualSoftwareCost;
    const savings = financial.annualProductivityValue;
    cumulativeNet += savings - investment;

    data.push({
      year: `Year ${year}`,
      investment,
      savings,
      cumulative: cumulativeNet,
    });
  }

  return data;
}

/**
 * Validate inputs are within acceptable ranges
 */
export function validateInputs(inputs: CalculatorInputs): string[] {
  const errors: string[] = [];

  if (inputs.employees < 1) errors.push('Team size must be at least 1');
  if (inputs.typingHoursPerDay <= 0) errors.push('Daily typing time must be positive');
  if (inputs.typingSpeedWPM <= 0) errors.push('Typing speed must be positive');
  if (inputs.voiceSpeedWPM <= inputs.typingSpeedWPM) {
    errors.push('Voice speed should be faster than typing speed');
  }
  if (inputs.labourRatePerHour <= 0) errors.push('Hourly cost must be positive');
  if (inputs.adoptionRatePercent <= 0 || inputs.adoptionRatePercent > 100) {
    errors.push('Adoption rate must be between 1% and 100%');
  }

  return errors;
}
