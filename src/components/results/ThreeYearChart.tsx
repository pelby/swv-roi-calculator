import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { CalculatorInputs, FinancialMetrics } from '../../types/calculator';
import { generateThreeYearData } from '../../lib/calculations';
import { formatCurrency } from '../../lib/formatters';

interface ThreeYearChartProps {
  inputs: CalculatorInputs;
  financial: FinancialMetrics;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--color-text-primary)] mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[var(--color-text-muted)]">Investment:</span>
            <span className="font-medium text-[var(--color-secondary)]">
              {formatCurrency(data.investment)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[var(--color-text-muted)]">Savings:</span>
            <span className="font-medium text-[var(--color-primary)]">
              {formatCurrency(data.savings)}
            </span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)]">Cumulative:</span>
            <span
              className={`font-bold ${
                data.cumulative >= 0 ? 'metric-positive' : 'metric-negative'
              }`}
            >
              {formatCurrency(data.cumulative)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ThreeYearChart({ inputs, financial }: ThreeYearChartProps) {
  const data = generateThreeYearData(inputs, financial);

  // Find min/max for Y axis
  const allValues = data.flatMap((d) => [d.investment, d.savings, d.cumulative]);
  const minValue = Math.min(...allValues, 0);
  const maxValue = Math.max(...allValues);
  const yDomain = [Math.floor(minValue * 1.1), Math.ceil(maxValue * 1.1)];

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="mb-6">
        <h3 className="mb-1">3-Year Projection</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Cumulative financial impact
        </p>
      </div>

      <div className="h-72 min-h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis
              domain={yDomain}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, { compact: true })}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="var(--color-border)" strokeWidth={2} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fill="url(#cumulativeGradient)"
              dot={{
                fill: 'var(--color-primary)',
                stroke: 'var(--color-card)',
                strokeWidth: 2,
                r: 5,
              }}
              activeDot={{
                fill: 'var(--color-primary)',
                stroke: 'var(--color-card)',
                strokeWidth: 2,
                r: 7,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)] grid grid-cols-3 gap-2 sm:gap-4">
        <div className="text-center p-2 rounded-lg bg-[var(--color-background)]">
          <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mb-0.5">Investment</p>
          <p className="text-sm sm:text-base font-semibold text-[var(--color-secondary)] tabular-nums">
            {formatCurrency(data[2].investment + data[1].investment + data[0].investment)}
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--color-background)]">
          <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mb-0.5">Savings</p>
          <p className="text-sm sm:text-base font-semibold text-[var(--color-primary)] tabular-nums">
            {formatCurrency(data[0].savings * 3)}
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--color-primary)]/5">
          <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mb-0.5">Net Benefit</p>
          <p
            className={`text-sm sm:text-base font-bold tabular-nums ${
              data[2].cumulative >= 0 ? 'metric-positive' : 'metric-negative'
            }`}
          >
            {data[2].cumulative >= 0 ? '↑ ' : '↓ '}
            {formatCurrency(Math.abs(data[2].cumulative))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
