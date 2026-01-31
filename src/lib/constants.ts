import type { CalculatorInputs, Preset } from '../types/calculator';

// Default input values
export const DEFAULT_INPUTS: CalculatorInputs = {
  // Basic
  employees: 10,
  typingHoursPerDay: 3,
  typingSpeedWPM: 40,
  voiceSpeedWPM: 150,
  labourRatePerHour: 50,
  softwareCostPerMonth: 15,
  deploymentCost: 500,
  // Advanced
  workingDaysPerYear: 220,
  adoptionRatePercent: 85,
  accuracyImpactPercent: 5,
  proofreadingOverheadPercent: 10,
};

// Presets for different personas
export const PRESETS: Preset[] = [
  {
    id: 'solo',
    label: "I'm a solo professional",
    description: 'Freelancer, consultant, or individual contributor',
    values: {
      employees: 1,
      typingHoursPerDay: 4,
      labourRatePerHour: 75,
      softwareCostPerMonth: 15,
      deploymentCost: 0,
      adoptionRatePercent: 95,
    },
  },
  {
    id: 'team',
    label: 'My team writes a lot',
    description: 'Department or team of 5-20 people',
    values: {
      employees: 10,
      typingHoursPerDay: 3,
      labourRatePerHour: 50,
      softwareCostPerMonth: 12,
      deploymentCost: 500,
      adoptionRatePercent: 80,
    },
  },
  {
    id: 'company',
    label: 'Evaluating for the company',
    description: 'Organisation-wide deployment, conservative assumptions',
    values: {
      employees: 50,
      typingHoursPerDay: 2,
      labourRatePerHour: 45,
      softwareCostPerMonth: 10,
      deploymentCost: 2500,
      adoptionRatePercent: 70,
      accuracyImpactPercent: 8,
      proofreadingOverheadPercent: 15,
    },
  },
  {
    id: 'custom',
    label: 'Custom values',
    description: 'Enter your own numbers',
    values: {},
  },
];

// Input constraints
export const INPUT_CONSTRAINTS = {
  employees: { min: 1, max: 10000, step: 1 },
  typingHoursPerDay: { min: 0.5, max: 8, step: 0.5 },
  typingSpeedWPM: { min: 10, max: 100, step: 5 },
  voiceSpeedWPM: { min: 80, max: 200, step: 10 },
  labourRatePerHour: { min: 10, max: 500, step: 5 },
  softwareCostPerMonth: { min: 0, max: 100, step: 1 },
  deploymentCost: { min: 0, max: 50000, step: 100 },
  workingDaysPerYear: { min: 100, max: 260, step: 5 },
  adoptionRatePercent: { min: 20, max: 100, step: 5 },
  accuracyImpactPercent: { min: 0, max: 30, step: 1 },
  proofreadingOverheadPercent: { min: 0, max: 50, step: 5 },
} as const;

// Input labels and descriptions
export const INPUT_META = {
  employees: {
    label: 'Team size',
    description: 'Number of people who will use voice dictation',
    unit: 'people',
  },
  typingHoursPerDay: {
    label: 'Daily typing time',
    description: 'Hours spent typing documents, emails, reports each day',
    unit: 'hours/day',
  },
  typingSpeedWPM: {
    label: 'Typing speed',
    description: 'Average typing speed (most people: 30-50 WPM)',
    unit: 'WPM',
  },
  voiceSpeedWPM: {
    label: 'Voice speed',
    description: 'Speaking speed for dictation (typically 120-180 WPM)',
    unit: 'WPM',
  },
  labourRatePerHour: {
    label: 'Hourly cost',
    description: 'Fully loaded cost per employee hour (salary + benefits)',
    unit: '£/hour',
  },
  softwareCostPerMonth: {
    label: 'Software cost',
    description: 'Per-user monthly subscription for dictation software',
    unit: '£/user/month',
  },
  deploymentCost: {
    label: 'Setup cost',
    description: 'One-time training and deployment costs',
    unit: '£',
  },
  workingDaysPerYear: {
    label: 'Working days',
    description: 'Days worked per year (UK average: 220)',
    unit: 'days/year',
  },
  adoptionRatePercent: {
    label: 'Adoption rate',
    description: 'Percentage of typing work that shifts to voice',
    unit: '%',
  },
  accuracyImpactPercent: {
    label: 'Accuracy overhead',
    description: 'Extra time for corrections due to recognition errors',
    unit: '%',
  },
  proofreadingOverheadPercent: {
    label: 'Proofreading overhead',
    description: 'Time spent reviewing and editing dictated text',
    unit: '%',
  },
} as const;

// ROI milestone thresholds
export const ROI_MILESTONES = [100, 500, 1000];

// Formatting options
export const CURRENCY_LOCALE = 'en-GB';
export const CURRENCY_CODE = 'GBP';
