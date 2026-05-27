import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CTASection } from "@/components/landing/CTASection";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Finanças</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/entrar"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastrar"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <CTASection />
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Finanças Pessoais. Todos os direitos
        reservados.
      </footer>
    </div>
  );
}
