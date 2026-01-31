import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CalculatorInputs } from '../../types/calculator';
import { generateComparisonData } from '../../lib/calculations';
import { formatHours } from '../../lib/formatters';

interface TimeComparisonChartProps {
  inputs: CalculatorInputs;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--color-text-primary)] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[var(--color-text-muted)]">{entry.name}:</span>
            <span className="font-medium text-[var(--color-text-primary)]">
              {formatHours(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function TimeComparisonChart({ inputs }: TimeComparisonChartProps) {
  const data = generateComparisonData(inputs);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="mb-1">Time Comparison</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Hours spent on text creation
        </p>
      </div>

      <div className="h-64 min-h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="typing"
              name="Typing"
              fill="var(--color-secondary)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="voice"
              name="Voice"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-secondary)]" />
          <span className="text-[var(--color-text-muted)]">Current (typing)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
          <span className="text-[var(--color-text-muted)]">With voice</span>
        </div>
      </div>
    </motion.div>
  );
}
