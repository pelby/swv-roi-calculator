import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileText, Copy, Check, Loader2 } from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';
import { cn } from '../../lib/utils';

interface LeadCaptureFormProps {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
  onPDFDownload: () => void;
  onCopyToClipboard: () => void;
}

export function LeadCaptureForm({
  inputs,
  outputs,
  onPDFDownload,
  onCopyToClipboard,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'roi-calculator-lead');
      formData.append('email', email);
      formData.append('employees', inputs.employees.toString());
      formData.append('annualSavings', outputs.financial.annualNetSavings.toString());
      formData.append('roi', outputs.roi.annualROIPercent.toString());
      formData.append('timestamp', new Date().toISOString());

      await fetch('/', {
        method: 'POST',
        body: formData,
      });

      setHasSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      // Still unlock features even if submission fails (graceful degradation)
      setHasSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    onCopyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="card card-tinted"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h3 className="mb-2">Get Your Full Report</h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              Enter your email to download a professional PDF report and copy results to share with
              your team.
            </p>

            <form
              name="roi-calculator-lead"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <input type="hidden" name="form-name" value="roi-calculator-lead" />

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input pl-11"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Unlock Report'
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}

              <p className="text-xs text-[var(--color-text-muted)] mt-3">
                We'll send you helpful resources. No spam, unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="mb-2">You're all set!</h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              Download your report or copy the results to share.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onPDFDownload} className="btn btn-primary">
                <FileText className="w-5 h-5" />
                Download PDF Report
              </button>
              <button
                onClick={handleCopy}
                className={cn(
                  'btn btn-outline',
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
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
