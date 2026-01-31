import { useState, useCallback, useMemo } from 'react';
import type { CalculatorInputs, CalculatorOutputs, PresetId } from '../types/calculator';
import { DEFAULT_INPUTS, PRESETS } from '../lib/constants';
import { calculateAll } from '../lib/calculations';

interface UseCalculatorReturn {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
  activePreset: PresetId;
  showAdvanced: boolean;
  updateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  applyPreset: (presetId: PresetId) => void;
  toggleAdvanced: () => void;
  resetToDefaults: () => void;
}

export function useCalculator(): UseCalculatorReturn {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activePreset, setActivePreset] = useState<PresetId>('team');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate outputs whenever inputs change
  const outputs = useMemo(() => calculateAll(inputs), [inputs]);

  // Update a single input value
  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
      setActivePreset('custom');
    },
    []
  );

  // Apply a preset configuration
  const applyPreset = useCallback((presetId: PresetId) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setInputs(() => ({
        ...DEFAULT_INPUTS,
        ...preset.values,
      }));
      setActivePreset(presetId);
    }
  }, []);

  // Toggle advanced options visibility
  const toggleAdvanced = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);

  // Reset to default values
  const resetToDefaults = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setActivePreset('team');
    setShowAdvanced(false);
  }, []);

  return {
    inputs,
    outputs,
    activePreset,
    showAdvanced,
    updateInput,
    applyPreset,
    toggleAdvanced,
    resetToDefaults,
  };
}
