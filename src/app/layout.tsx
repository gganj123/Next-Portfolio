import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/home/hero';
import { ReactNode } from 'react';
import about from './about/page';
import ScrollingPanels from '@/components/ScrollingPanels';
import BackgroundChanger from './../components/ScrollingPanels';
import RevealOnScroll from './../components/RevealOnScroll';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        {/* <BackgroundChanger> */}
        {/* <Header /> */}
        {/* <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font"> */}
        {/* <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"> */}
        {/* <Hero /> */}
        <RevealOnScroll />
        {/* </div> */}
        {/* </section> */}

        <main>{children}</main>

        <Footer />
        {/* </BackgroundChanger> */}
      </body>
    </html>
  );
}
