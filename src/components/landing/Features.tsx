import {
  BarChart3,
  Download,
  Filter,
  PiggyBank,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: PiggyBank,
    title: "Controle de receitas e despesas",
    description:
      "Registre transações por categoria, acompanhe seu saldo e tenha visão clara do seu dinheiro.",
  },
  {
    icon: BarChart3,
    title: "Dashboard visual",
    description:
      "Gráfico de pizza por categoria de gastos e cards com resumo de receitas, despesas e saldo.",
  },
  {
    icon: Filter,
    title: "Filtros avançados",
    description:
      "Filtre por mês, ano, categoria ou busque transações pelo nome. Fácil de encontrar qualquer lançamento.",
  },
  {
    icon: Download,
    title: "Exportação CSV",
    description:
      "Exporte seus dados filtrados para Excel em um clique, com caracteres brasileiros corretamente codificados.",
  },
  {
    icon: ShieldCheck,
    title: "Dados seguros",
    description:
      "Autenticação segura e dados protegidos com Row Level Security no Supabase. Só você vê os seus dados.",
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    description:
      "Interface adaptada para desktop e mobile. Acesse suas finanças de qualquer dispositivo.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Uma solução completa para quem quer organizar as finanças pessoais
            sem complicação.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
