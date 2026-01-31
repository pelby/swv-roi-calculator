import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, TrendingUp } from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';
import {
  formatCurrency,
  formatPercent,
  formatHours,
  formatFTE,
} from '../../lib/formatters';
import { TimeComparisonChart } from './TimeComparisonChart';
import { ThreeYearChart } from './ThreeYearChart';

interface ResultsDeepDiveProps {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

export function ResultsDeepDive({ inputs, outputs }: ResultsDeepDiveProps) {
  const { time, financial, organisation } = outputs;

  return (
    <div className="space-y-8">
      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <TimeComparisonChart inputs={inputs} />
        <ThreeYearChart inputs={inputs} financial={financial} />
      </div>

      {/* Detailed metrics */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-6">Detailed Breakdown</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Time Savings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Time Savings</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Per person/day</span>
                <span className="font-medium">{formatHours(time.dailyHoursSavedPerPerson)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Per person/week</span>
                <span className="font-medium">{formatHours(time.weeklyHoursSavedPerPerson)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Per person/year</span>
                <span className="font-medium">{formatHours(time.annualHoursSavedPerPerson)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Team total/year</span>
                <span className="font-bold text-[var(--color-primary)]">
                  {formatHours(time.annualHoursSavedTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-secondary)]">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Financial Impact</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Productivity value</span>
                <span className="font-medium">{formatCurrency(financial.annualProductivityValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Software cost</span>
                <span className="font-medium text-[var(--color-secondary)]">
                  -{formatCurrency(financial.annualSoftwareCost)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Net savings/year</span>
                <span
                  className={`font-bold ${
                    financial.annualNetSavings >= 0 ? 'metric-positive' : 'metric-negative'
                  }`}
                >
                  {formatCurrency(financial.annualNetSavings)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Net savings/month</span>
                <span className="font-medium">{formatCurrency(financial.monthlyNetSavings)}</span>
              </div>
            </div>
          </div>

          {/* Organisation Impact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Organisation Impact</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">FTE equivalent</span>
                <span className="font-medium">
                  {formatFTE(organisation.effectiveEmployeesEquivalent)} employees
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Productivity gain</span>
                <span className="font-medium">
                  {formatPercent(organisation.totalProductivityGainPercent, 0)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">Team size</span>
                <span className="font-medium">{inputs.employees} people</span>
              </div>
            </div>
          </div>

          {/* Assumptions Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Key Assumptions</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Typing speed</span>
                <span className="font-medium">{inputs.typingSpeedWPM} WPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Voice speed</span>
                <span className="font-medium">{inputs.voiceSpeedWPM} WPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Adoption rate</span>
                <span className="font-medium">{inputs.adoptionRatePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Working days</span>
                <span className="font-medium">{inputs.workingDaysPerYear}/year</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
