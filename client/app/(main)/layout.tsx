import { Registered } from '@/shared/components/registered-layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <Registered>{children}</Registered>;
}
