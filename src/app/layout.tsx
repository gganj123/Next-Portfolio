import { ReactNode } from 'react';
import RevealOnScroll from './../components/RevealOnScroll';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <RevealOnScroll />
      </body>
    </html>
  );
}
