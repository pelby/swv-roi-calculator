import { useId } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NumberInputProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function NumberInput({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 10000,
  step = 1,
  unit,
  className,
}: NumberInputProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(Math.min(max, Math.max(min, newValue)));
    }
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="label">
        {label}
        {unit && <span className="text-[var(--color-text-muted)] font-normal ml-1">({unit})</span>}
      </label>
      <div className="flex items-stretch rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          className="shrink-0 w-12 flex items-center justify-center border-r border-[var(--color-border)] hover:bg-[var(--color-card-tint)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          aria-label="Decrease"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          id={id}
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="flex-1 min-w-0 w-full py-3 px-2 text-center font-semibold text-[var(--color-text-primary)] bg-transparent border-none outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="shrink-0 w-12 flex items-center justify-center border-l border-[var(--color-border)] hover:bg-[var(--color-card-tint)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          aria-label="Increase"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {description && (
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
