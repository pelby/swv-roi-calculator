import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface VoiceWaveformProps {
  className?: string;
  barCount?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function VoiceWaveform({
  className,
  barCount = 7,
  size = 'md',
  animated = true,
}: VoiceWaveformProps) {
  const sizeClasses = {
    sm: 'h-4 gap-0.5',
    md: 'h-8 gap-1',
    lg: 'h-12 gap-1.5',
  };

  const barWidths = {
    sm: 'w-0.5',
    md: 'w-1',
    lg: 'w-1.5',
  };

  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className={cn('flex items-center justify-center', sizeClasses[size], className)}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'bg-[var(--color-primary)] rounded-full',
            barWidths[size]
          )}
          style={{ height: '100%' }}
          animate={
            animated
              ? {
                  scaleY: [0.3, 1, 0.3],
                }
              : { scaleY: 0.5 }
          }
          transition={
            animated
              ? {
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }
              : {}
          }
        />
      ))}
    </div>
  );
}
