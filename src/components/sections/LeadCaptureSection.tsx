import { motion } from 'framer-motion';
import type { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';
import { LeadCaptureForm } from '../sharing/LeadCaptureForm';
import { downloadPDF } from '../sharing/PDFReport';
import { generateClipboardText } from '../sharing/ShareButtons';

interface LeadCaptureSectionProps {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

export function LeadCaptureSection({ inputs, outputs }: LeadCaptureSectionProps) {
  const handlePDFDownload = () => {
    downloadPDF(inputs, outputs);
  };

  const handleCopyToClipboard = async () => {
    const text = generateClipboardText(inputs, outputs);
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="section">
      <div className="container-main">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <LeadCaptureForm
            inputs={inputs}
            outputs={outputs}
            onPDFDownload={handlePDFDownload}
            onCopyToClipboard={handleCopyToClipboard}
          />
        </motion.div>
      </div>
    </section>
  );
}
