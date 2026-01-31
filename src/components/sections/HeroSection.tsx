import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { VoiceWaveform } from '../ui/VoiceWaveform';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center gradient-mesh overflow-hidden">
      {/* Background waveform decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <VoiceWaveform size="lg" barCount={15} className="scale-[8]" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full px-4 py-2 mb-8">
              <VoiceWaveform size="sm" barCount={5} />
              <span className="text-sm text-[var(--color-text-muted)]">
                Free ROI Calculator
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your team speaks{' '}
            <span className="text-[var(--color-primary)]">3&times; faster</span> than
            they type
          </motion.h1>

          <motion.p
            className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Calculate how much time and money voice dictation could save your organisation.
            Get instant results with our free ROI calculator.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#calculator" className="btn btn-primary text-lg px-8 py-4">
              Calculate Your Savings
              <ArrowDown className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats teaser */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--color-primary)]">3&times;</p>
              <p className="text-sm text-[var(--color-text-muted)]">Faster input</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--color-secondary)]">150</p>
              <p className="text-sm text-[var(--color-text-muted)]">Words per min</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--color-text-primary)]">2h+</p>
              <p className="text-sm text-[var(--color-text-muted)]">Saved daily</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { repeat: Infinity, duration: 2 },
        }}
      >
        <ArrowDown className="w-6 h-6 text-[var(--color-text-muted)]" />
      </motion.div>
    </section>
  );
}
