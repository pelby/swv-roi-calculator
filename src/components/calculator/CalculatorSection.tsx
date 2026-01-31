import { motion } from 'framer-motion';
import { useCalculator } from '../../hooks/useCalculator';
import { InputPanel } from './InputPanel';
import { ResultsPreview } from '../results/ResultsPreview';
import { ResultsDeepDive } from '../results/ResultsDeepDive';

export function CalculatorSection() {
  const {
    inputs,
    outputs,
    activePreset,
    showAdvanced,
    updateInput,
    applyPreset,
    toggleAdvanced,
  } = useCalculator();

  return (
    <section id="calculator" className="section">
      <div className="container-main">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Calculate Your Savings</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Enter your team's details below to see how much time and money voice dictation could
            save you.
          </p>
        </motion.div>

        {/* Asymmetric layout: 40% inputs, 60% results on desktop */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 items-start">
          {/* Input Panel */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InputPanel
              inputs={inputs}
              activePreset={activePreset}
              showAdvanced={showAdvanced}
              onInputChange={updateInput}
              onPresetSelect={applyPreset}
              onToggleAdvanced={toggleAdvanced}
            />
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ResultsPreview outputs={outputs} />
            <ResultsDeepDive inputs={inputs} outputs={outputs} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
