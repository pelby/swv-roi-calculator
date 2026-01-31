import { useId } from 'react';
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
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="label">
        {label}
        {unit && <span className="text-[var(--color-text-muted)] font-normal ml-1">({unit})</span>}
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="absolute left-2 w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-card-tint)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Decrease"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="8" x2="12" y2="8" />
          </svg>
        </button>
        <input
          id={id}
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="input text-center px-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-card-tint)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Increase"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="4" x2="8" y2="12" />
            <line x1="4" y1="8" x2="12" y2="8" />
          </svg>
        </button>
      </div>
      {description && (
        <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
      )}
    </div>
  );
}
