import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { CalculatorInputs } from '../../types/calculator';
import { INPUT_CONSTRAINTS, INPUT_META } from '../../lib/constants';
import { SliderInput } from './SliderInput';
import { NumberInput } from './NumberInput';
import { cn } from '../../lib/utils';

interface AdvancedInputsProps {
  inputs: CalculatorInputs;
  onChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AdvancedInputs({ inputs, onChange, isOpen, onToggle }: AdvancedInputsProps) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4 mt-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left py-2 group"
      >
        <span className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
          Advanced assumptions
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-6">
              <p className="text-sm text-[var(--color-text-muted)]">
                Adjust these settings to match your organisation's context. Conservative
                assumptions give more defensible projections.
              </p>

              <NumberInput
                label={INPUT_META.workingDaysPerYear.label}
                description={INPUT_META.workingDaysPerYear.description}
                value={inputs.workingDaysPerYear}
                onChange={(v) => onChange('workingDaysPerYear', v)}
                {...INPUT_CONSTRAINTS.workingDaysPerYear}
                unit={INPUT_META.workingDaysPerYear.unit}
              />

              <SliderInput
                label={INPUT_META.adoptionRatePercent.label}
                description={INPUT_META.adoptionRatePercent.description}
                value={inputs.adoptionRatePercent}
                onChange={(v) => onChange('adoptionRatePercent', v)}
                {...INPUT_CONSTRAINTS.adoptionRatePercent}
                unit="%"
              />

              <SliderInput
                label={INPUT_META.accuracyImpactPercent.label}
                description={INPUT_META.accuracyImpactPercent.description}
                value={inputs.accuracyImpactPercent}
                onChange={(v) => onChange('accuracyImpactPercent', v)}
                {...INPUT_CONSTRAINTS.accuracyImpactPercent}
                unit="%"
              />

              <SliderInput
                label={INPUT_META.proofreadingOverheadPercent.label}
                description={INPUT_META.proofreadingOverheadPercent.description}
                value={inputs.proofreadingOverheadPercent}
                onChange={(v) => onChange('proofreadingOverheadPercent', v)}
                {...INPUT_CONSTRAINTS.proofreadingOverheadPercent}
                unit="%"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
