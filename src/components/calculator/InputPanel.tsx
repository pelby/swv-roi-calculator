import type { CalculatorInputs, PresetId } from '../../types/calculator';
import { PresetSelector } from './PresetSelector';
import { BasicInputs } from './BasicInputs';
import { AdvancedInputs } from './AdvancedInputs';

interface InputPanelProps {
  inputs: CalculatorInputs;
  activePreset: PresetId;
  showAdvanced: boolean;
  onInputChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  onPresetSelect: (presetId: PresetId) => void;
  onToggleAdvanced: () => void;
}

export function InputPanel({
  inputs,
  activePreset,
  showAdvanced,
  onInputChange,
  onPresetSelect,
  onToggleAdvanced,
}: InputPanelProps) {
  return (
    <div className="space-y-8">
      <PresetSelector activePreset={activePreset} onSelect={onPresetSelect} />

      <div className="card">
        <BasicInputs inputs={inputs} onChange={onInputChange} />
        <AdvancedInputs
          inputs={inputs}
          onChange={onInputChange}
          isOpen={showAdvanced}
          onToggle={onToggleAdvanced}
        />
      </div>
    </div>
  );
}
