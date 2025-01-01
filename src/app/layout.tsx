import { MindBending } from '@/components/MindBending/MindBending';
import RevealOnScroll from '@/components/RevealOnScroll/RevealOnScroll';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
