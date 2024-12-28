import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/home/hero";
import { ReactNode } from "react";
import Animation from "@/components/Animation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <Header />

        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <Hero />
          </div>
        </section>
        {children}
        <Footer />
      </body>
    </html>
  );
}
