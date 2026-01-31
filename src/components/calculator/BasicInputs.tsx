import type { CalculatorInputs } from '../../types/calculator';
import { INPUT_CONSTRAINTS, INPUT_META } from '../../lib/constants';
import { NumberInput } from './NumberInput';
import { SliderInput } from './SliderInput';

interface BasicInputsProps {
  inputs: CalculatorInputs;
  onChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

export function BasicInputs({ inputs, onChange }: BasicInputsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput
          label={INPUT_META.employees.label}
          description={INPUT_META.employees.description}
          value={inputs.employees}
          onChange={(v) => onChange('employees', v)}
          {...INPUT_CONSTRAINTS.employees}
          unit={INPUT_META.employees.unit}
        />

        <SliderInput
          label={INPUT_META.typingHoursPerDay.label}
          description={INPUT_META.typingHoursPerDay.description}
          value={inputs.typingHoursPerDay}
          onChange={(v) => onChange('typingHoursPerDay', v)}
          {...INPUT_CONSTRAINTS.typingHoursPerDay}
          unit={INPUT_META.typingHoursPerDay.unit}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SliderInput
          label={INPUT_META.typingSpeedWPM.label}
          description={INPUT_META.typingSpeedWPM.description}
          value={inputs.typingSpeedWPM}
          onChange={(v) => onChange('typingSpeedWPM', v)}
          {...INPUT_CONSTRAINTS.typingSpeedWPM}
          unit={INPUT_META.typingSpeedWPM.unit}
        />

        <SliderInput
          label={INPUT_META.voiceSpeedWPM.label}
          description={INPUT_META.voiceSpeedWPM.description}
          value={inputs.voiceSpeedWPM}
          onChange={(v) => onChange('voiceSpeedWPM', v)}
          {...INPUT_CONSTRAINTS.voiceSpeedWPM}
          unit={INPUT_META.voiceSpeedWPM.unit}
        />
      </div>

      <div className="pt-4 border-t border-[var(--color-border)]">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Costs</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput
            label={INPUT_META.labourRatePerHour.label}
            description={INPUT_META.labourRatePerHour.description}
            value={inputs.labourRatePerHour}
            onChange={(v) => onChange('labourRatePerHour', v)}
            {...INPUT_CONSTRAINTS.labourRatePerHour}
            unit={INPUT_META.labourRatePerHour.unit}
          />

          <NumberInput
            label={INPUT_META.softwareCostPerMonth.label}
            description={INPUT_META.softwareCostPerMonth.description}
            value={inputs.softwareCostPerMonth}
            onChange={(v) => onChange('softwareCostPerMonth', v)}
            {...INPUT_CONSTRAINTS.softwareCostPerMonth}
            unit={INPUT_META.softwareCostPerMonth.unit}
          />

          <NumberInput
            label={INPUT_META.deploymentCost.label}
            description={INPUT_META.deploymentCost.description}
            value={inputs.deploymentCost}
            onChange={(v) => onChange('deploymentCost', v)}
            {...INPUT_CONSTRAINTS.deploymentCost}
            unit={INPUT_META.deploymentCost.unit}
          />
        </div>
      </div>
    </div>
  );
}
