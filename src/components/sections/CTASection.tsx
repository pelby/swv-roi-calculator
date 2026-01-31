import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { VoiceWaveform } from '../ui/VoiceWaveform';

export function CTASection() {
  return (
    <section className="section gradient-mesh relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <VoiceWaveform size="lg" barCount={11} className="scale-[6]" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to transform your team?</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Start with Voice helps organisations unlock the power of voice dictation through
            hands-on training, AI-powered workflows, and ongoing support.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://withvoice.ai/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Book a Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://withvoice.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-lg px-8 py-4"
            >
              Learn About Our Programme
            </a>
          </div>

          <p className="mt-8 text-sm text-[var(--color-text-muted)]">
            No commitment required. Let's discuss how voice dictation can work for your team.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
