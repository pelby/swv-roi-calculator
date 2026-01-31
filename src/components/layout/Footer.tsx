import { VoiceWaveform } from '../ui/VoiceWaveform';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-12 bg-[var(--color-card)]">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <VoiceWaveform size="sm" barCount={5} animated={false} />
            <span className="font-semibold text-[var(--color-text-primary)]">
              Start with Voice
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://withvoice.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Website
            </a>
            <a
              href="https://withvoice.ai/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="https://withvoice.ai/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; {currentYear} WithVoice Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
