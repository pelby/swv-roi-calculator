import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';
import {
  formatCurrency,
  formatPercent,
  formatHours,
  formatBreakeven,
} from '../../lib/formatters';
import { cn } from '../../lib/utils';

interface ShareButtonsProps {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
  isUnlocked: boolean;
  onRequestUnlock: () => void;
}

export function ShareButtons({
  inputs,
  outputs,
  isUnlocked,
  onRequestUnlock,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const { time, financial, roi } = outputs;

    return `Voice Dictation ROI Analysis
=============================

Team Size: ${inputs.employees} people
Daily Typing Time: ${inputs.typingHoursPerDay} hours

KEY RESULTS
-----------
Annual Net Savings: ${formatCurrency(financial.annualNetSavings)}
ROI: ${formatPercent(roi.annualROIPercent, 0)}
Time to Breakeven: ${formatBreakeven(roi.monthsToBreakeven)}

TIME SAVINGS (per person)
-------------------------
Daily: ${formatHours(time.dailyHoursSavedPerPerson)}
Weekly: ${formatHours(time.weeklyHoursSavedPerPerson)}
Annually: ${formatHours(time.annualHoursSavedPerPerson)}

3-YEAR PROJECTION
-----------------
Total Investment: ${formatCurrency(roi.threeYearTotalInvestment)}
Total Savings: ${formatCurrency(roi.threeYearTotalSavings)}
Net Benefit: ${formatCurrency(roi.threeYearNetBenefit)}

---
Calculated with the Voice Dictation ROI Calculator
https://roi.withvoice.ai`;
  };

  const handleCopy = async () => {
    if (!isUnlocked) {
      onRequestUnlock();
      return;
    }

    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopy}
        className={cn(
          'btn btn-outline flex-1',
          copied && 'border-[var(--color-primary)] text-[var(--color-primary)]'
        )}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            {isUnlocked ? 'Copy Results' : 'Copy (unlock first)'}
          </>
        )}
      </button>
    </div>
  );
}

// Export the text generator for use elsewhere
export function generateClipboardText(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { time, financial, roi } = outputs;

  return `Voice Dictation ROI Analysis
=============================

Team Size: ${inputs.employees} people
Daily Typing Time: ${inputs.typingHoursPerDay} hours

KEY RESULTS
-----------
Annual Net Savings: ${formatCurrency(financial.annualNetSavings)}
ROI: ${formatPercent(roi.annualROIPercent, 0)}
Time to Breakeven: ${formatBreakeven(roi.monthsToBreakeven)}

TIME SAVINGS (per person)
-------------------------
Daily: ${formatHours(time.dailyHoursSavedPerPerson)}
Weekly: ${formatHours(time.weeklyHoursSavedPerPerson)}
Annually: ${formatHours(time.annualHoursSavedPerPerson)}

3-YEAR PROJECTION
-----------------
Total Investment: ${formatCurrency(roi.threeYearTotalInvestment)}
Total Savings: ${formatCurrency(roi.threeYearTotalSavings)}
Net Benefit: ${formatCurrency(roi.threeYearNetBenefit)}

---
Calculated with the Voice Dictation ROI Calculator
https://roi.withvoice.ai`;
}
