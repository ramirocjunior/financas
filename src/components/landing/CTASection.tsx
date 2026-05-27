import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">
          Comece a controlar suas finanças hoje
        </h2>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          Gratuito, sem cartão de crédito. Cadastre-se e tenha acesso imediato
          ao seu painel financeiro.
        </p>
        <Link
          href="/cadastrar"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
        >
          Criar minha conta grátis
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
