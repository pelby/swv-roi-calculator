import { motion } from 'framer-motion';
import type { PresetId } from '../../types/calculator';
import { PRESETS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface PresetSelectorProps {
  activePreset: PresetId;
  onSelect: (presetId: PresetId) => void;
}

export function PresetSelector({ activePreset, onSelect }: PresetSelectorProps) {
  // Filter out 'custom' from selectable presets
  const selectablePresets = PRESETS.filter((p) => p.id !== 'custom');

  return (
    <div className="space-y-3">
      <label className="label">I am...</label>
      <div className="grid gap-3">
        {selectablePresets.map((preset) => (
          <motion.button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className={cn(
              'relative w-full text-left p-4 rounded-lg border-2 transition-colors',
              activePreset === preset.id
                ? 'border-[var(--color-primary)] bg-[var(--color-card-tint)]'
                : 'border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-secondary-light)]'
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {activePreset === preset.id && (
              <motion.div
                layoutId="preset-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary)] rounded-l-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="font-semibold text-[var(--color-text-primary)] block">
              {preset.label}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{preset.description}</span>
          </motion.button>
        ))}
      </div>
      {activePreset === 'custom' && (
        <p className="text-sm text-[var(--color-text-muted)] italic">
          Using custom values
        </p>
      )}
    </div>
  );
}
