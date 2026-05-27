import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="h-4 w-4" />
          Controle financeiro simples e visual
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Suas finanças no{" "}
          <span className="text-primary">controle</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Registre receitas e despesas, acompanhe seu saldo em tempo real e
          visualize para onde vai seu dinheiro com gráficos intuitivos.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cadastrar"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors text-base"
          >
            Começar grátis
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/entrar"
            className="inline-flex items-center px-6 py-3 rounded-md font-medium border border-input hover:bg-accent transition-colors text-base"
          >
            Já tenho conta
          </Link>
        </div>
      </div>
    </section>
  );
}
