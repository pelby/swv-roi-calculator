import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';
import type { CalculatorOutputs } from '../../types/calculator';
import {
  formatCurrency,
  formatPercent,
  formatBreakeven,
  formatHours,
} from '../../lib/formatters';
import { cn } from '../../lib/utils';

interface ResultsPreviewProps {
  outputs: CalculatorOutputs;
  className?: string;
}

export function ResultsPreview({ outputs, className }: ResultsPreviewProps) {
  const { financial, roi, time, isPositiveROI } = outputs;

  return (
    <motion.div
      className={cn(
        'card card-tinted relative overflow-hidden',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent pointer-events-none" />

      <div className="relative space-y-6">
        {/* Hero metric - Annual Savings */}
        <div className="text-center pb-6 border-b border-[var(--color-border)]">
          <p className="label mb-2">Annual Net Savings</p>
          <motion.div
            className="flex items-center justify-center gap-3"
            key={financial.annualNetSavings}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {isPositiveROI ? (
              <TrendingUp className="w-8 h-8 text-[var(--color-positive)]" />
            ) : (
              <TrendingDown className="w-8 h-8 text-[var(--color-negative)]" />
            )}
            <span
              className={cn(
                'hero-number',
                isPositiveROI ? 'metric-positive' : 'metric-negative'
              )}
            >
              {formatCurrency(Math.abs(financial.annualNetSavings))}
            </span>
          </motion.div>
          {!isPositiveROI && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Net cost (software exceeds productivity gain)
            </p>
          )}
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <Zap className="w-4 h-4" />
              <span className="label mb-0">ROI</span>
            </div>
            <motion.p
              className={cn(
                'text-2xl font-bold',
                roi.annualROIPercent > 0 ? 'metric-positive' : 'metric-negative'
              )}
              key={roi.annualROIPercent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatPercent(roi.annualROIPercent, 0)}
            </motion.p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <Clock className="w-4 h-4" />
              <span className="label mb-0">Breakeven</span>
            </div>
            <motion.p
              className="text-2xl font-bold text-[var(--color-text-primary)]"
              key={roi.monthsToBreakeven}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatBreakeven(roi.monthsToBreakeven)}
            </motion.p>
          </div>
        </div>

        {/* Time saved summary */}
        <div className="bg-[var(--color-card)] rounded-lg p-4 border border-[var(--color-border)]">
          <p className="label mb-2">Time Saved Per Person</p>
          <div className="flex justify-between items-baseline">
            <span className="text-[var(--color-text-muted)]">Daily</span>
            <span className="font-semibold text-[var(--color-text-primary)]">
              {formatHours(time.dailyHoursSavedPerPerson)}
            </span>
          </div>
          <div className="flex justify-between items-baseline mt-1">
            <span className="text-[var(--color-text-muted)]">Annually</span>
            <span className="font-semibold text-[var(--color-text-primary)]">
              {formatHours(time.annualHoursSavedPerPerson)}
            </span>
          </div>
        </div>

        {/* 3-year projection teaser */}
        <div className="text-center pt-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">3-year net benefit</p>
          <p
            className={cn(
              'text-xl font-bold',
              roi.threeYearNetBenefit > 0 ? 'metric-positive' : 'metric-negative'
            )}
          >
            {roi.threeYearNetBenefit > 0 ? '↑ ' : '↓ '}
            {formatCurrency(Math.abs(roi.threeYearNetBenefit))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
