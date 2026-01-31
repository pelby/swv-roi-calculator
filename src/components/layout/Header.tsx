import { VoiceWaveform } from '../ui/VoiceWaveform';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <VoiceWaveform size="sm" barCount={5} />
            <span className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              Start with Voice
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            <a
              href="#calculator"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Calculator
            </a>
            <a
              href="#methodology"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Methodology
            </a>
          </nav>

          {/* CTA */}
          <a
            href="https://withvoice.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm py-2 px-4"
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}
