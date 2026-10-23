import { Container } from '@/shared/ui/container';
import { Navigation } from '@/widgets/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:grid md:grid-cols-[248px_minmax(0,1fr)]">
      <a
        className="fixed top-3 left-3 z-20 -translate-y-[calc(100%+16px)] rounded-xl bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
        href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" className="flex min-w-0 flex-1 flex-col wrap-anywhere" tabIndex={-1}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
