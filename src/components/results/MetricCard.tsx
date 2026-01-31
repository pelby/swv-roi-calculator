import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { getROIIcon } from '../../lib/formatters';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  status?: 'positive' | 'negative' | 'neutral';
  showIcon?: boolean;
  size?: 'default' | 'large';
  className?: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  status = 'neutral',
  showIcon = false,
  size = 'default',
  className,
}: MetricCardProps) {
  const icon = getROIIcon(status);

  return (
    <motion.div
      className={cn(
        'card',
        size === 'large' && 'card-tinted',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="label mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        {showIcon && (
          <span
            className={cn(
              'text-lg font-bold',
              status === 'positive' && 'metric-positive',
              status === 'negative' && 'metric-negative',
              status === 'neutral' && 'metric-neutral'
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <motion.p
          className={cn(
            'font-bold tracking-tight',
            size === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl',
            status === 'positive' && 'metric-positive',
            status === 'negative' && 'metric-negative',
            status === 'neutral' && 'text-[var(--color-text-primary)]'
          )}
          key={value}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {value}
        </motion.p>
      </div>
      {subValue && (
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{subValue}</p>
      )}
    </motion.div>
  );
}
