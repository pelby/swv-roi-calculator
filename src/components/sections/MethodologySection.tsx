import { motion } from 'framer-motion';
import { Calculator, Clock, TrendingUp, Shield } from 'lucide-react';

const methodologyItems = [
  {
    icon: Clock,
    title: 'Time Savings',
    description:
      'Based on the speed difference between typical typing (40 WPM) and speaking (150 WPM), adjusted for adoption rate and accuracy overhead.',
  },
  {
    icon: Calculator,
    title: 'Financial Value',
    description:
      'Time saved is valued at your specified hourly rate, representing productivity that can be redirected to higher-value work.',
  },
  {
    icon: TrendingUp,
    title: 'ROI Calculation',
    description:
      'Net savings (productivity gains minus software costs) divided by total investment (software + deployment), expressed as a percentage.',
  },
  {
    icon: Shield,
    title: 'Conservative Defaults',
    description:
      'Default assumptions err on the side of caution: 85% adoption rate, 5% accuracy overhead, and 10% proofreading time.',
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="section bg-[var(--color-card)]">
      <div className="container-main">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>How We Calculate</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Our methodology is designed to produce defensible, conservative estimates that
            you can confidently present to stakeholders.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologyItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--color-card-tint)] flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Formula breakdown */}
        <motion.div
          className="mt-12 card card-tinted max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-4">The Formula</h3>
          <div className="space-y-4 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-semibold text-[var(--color-text-primary)] shrink-0">
                Time Savings Ratio =
              </span>
              <code className="bg-[var(--color-card)] px-3 py-1 rounded border border-[var(--color-border)]">
                (1 - TypingSpeed/VoiceSpeed) &times; AccuracyFactor &times; ProofreadingFactor
              </code>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-semibold text-[var(--color-text-primary)] shrink-0">
                Hours Saved/Day =
              </span>
              <code className="bg-[var(--color-card)] px-3 py-1 rounded border border-[var(--color-border)]">
                TypingHours &times; TimeSavingsRatio &times; AdoptionRate
              </code>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-semibold text-[var(--color-text-primary)] shrink-0">
                Annual Value =
              </span>
              <code className="bg-[var(--color-card)] px-3 py-1 rounded border border-[var(--color-border)]">
                HoursSaved &times; WorkingDays &times; Employees &times; HourlyRate
              </code>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            All calculations use your custom inputs. Adjust the advanced settings to match
            your organisation's specific context.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
