import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, Settings2 } from 'lucide-react';
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

interface MetricRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  valueColor?: 'primary' | 'secondary' | 'default';
}

function MetricRow({ label, value, highlight, valueColor = 'default' }: MetricRowProps) {
  const valueClasses = {
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    default: 'text-[var(--color-text-primary)]',
  };

  return (
    <div className={`flex items-baseline justify-between gap-3 py-2 ${highlight ? 'pt-3 mt-1 border-t border-[var(--color-border)]' : ''}`}>
      <span className="text-sm text-[var(--color-text-muted)] shrink-0">{label}</span>
      <span className={`text-sm font-semibold tabular-nums text-right ${highlight ? 'font-bold' : ''} ${valueClasses[valueColor]}`}>
        {value}
      </span>
    </div>
  );
}

export function ResultsDeepDive({ inputs, outputs }: ResultsDeepDiveProps) {
  const { time, financial, organisation } = outputs;

  return (
    <div className="space-y-8">
      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 auto-rows-min">
        <TimeComparisonChart inputs={inputs} />
        <ThreeYearChart inputs={inputs} financial={financial} />
      </div>

      {/* Detailed metrics - redesigned for clarity */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-6">Detailed Breakdown</h3>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Time Savings */}
          <div className="p-4 rounded-xl bg-[var(--color-background)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">Time Savings</span>
            </div>
            <div className="space-y-0">
              <MetricRow label="Per person/day" value={formatHours(time.dailyHoursSavedPerPerson)} />
              <MetricRow label="Per person/week" value={formatHours(time.weeklyHoursSavedPerPerson)} />
              <MetricRow label="Per person/year" value={formatHours(time.annualHoursSavedPerPerson)} />
              <MetricRow
                label="Team total/year"
                value={formatHours(time.annualHoursSavedTotal)}
                highlight
                valueColor="primary"
              />
            </div>
          </div>

          {/* Financial Impact */}
          <div className="p-4 rounded-xl bg-[var(--color-background)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[var(--color-secondary)]" />
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">Financial Impact</span>
            </div>
            <div className="space-y-0">
              <MetricRow label="Productivity value" value={formatCurrency(financial.annualProductivityValue)} />
              <MetricRow
                label="Software cost"
                value={`-${formatCurrency(financial.annualSoftwareCost)}`}
                valueColor="secondary"
              />
              <MetricRow
                label="Net savings/year"
                value={formatCurrency(financial.annualNetSavings)}
                highlight
                valueColor={financial.annualNetSavings >= 0 ? 'primary' : 'secondary'}
              />
              <MetricRow label="Net savings/month" value={formatCurrency(financial.monthlyNetSavings)} />
            </div>
          </div>

          {/* Organisation Impact */}
          <div className="p-4 rounded-xl bg-[var(--color-background)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-text-muted)]/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-[var(--color-text-muted)]" />
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">Organisation Impact</span>
            </div>
            <div className="space-y-0">
              <MetricRow
                label="FTE equivalent"
                value={`${formatFTE(organisation.effectiveEmployeesEquivalent)} employees`}
              />
              <MetricRow
                label="Productivity gain"
                value={formatPercent(organisation.totalProductivityGainPercent, 0)}
              />
              <MetricRow label="Team size" value={`${inputs.employees} people`} highlight />
            </div>
          </div>

          {/* Key Assumptions */}
          <div className="p-4 rounded-xl bg-[var(--color-background)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-text-muted)]/10 flex items-center justify-center">
                <Settings2 className="w-4 h-4 text-[var(--color-text-muted)]" />
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">Key Assumptions</span>
            </div>
            <div className="space-y-0">
              <MetricRow label="Typing speed" value={`${inputs.typingSpeedWPM} WPM`} />
              <MetricRow label="Voice speed" value={`${inputs.voiceSpeedWPM} WPM`} />
              <MetricRow label="Adoption rate" value={`${inputs.adoptionRatePercent}%`} />
              <MetricRow label="Working days" value={`${inputs.workingDaysPerYear}/year`} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
