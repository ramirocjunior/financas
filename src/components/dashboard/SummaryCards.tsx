import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  loading: boolean;
}

export function SummaryCards({
  totalReceitas,
  totalDespesas,
  saldo,
  loading,
}: SummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Receitas",
      value: totalReceitas,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Despesas",
      value: totalDespesas,
      icon: TrendingDown,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Saldo",
      value: saldo,
      icon: Wallet,
      color: saldo >= 0 ? "text-blue-600" : "text-red-600",
      bg: saldo >= 0 ? "bg-blue-50" : "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", card.bg)}>
                <Icon className={cn("h-4 w-4", card.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <p className={cn("text-2xl font-bold", card.color)}>
                {formatCurrency(card.value)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
