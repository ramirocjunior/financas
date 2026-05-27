import { useMemo } from "react";
import type { Transaction } from "@/types";
import { CORES_CATEGORIAS } from "@/lib/constants";

export function useDashboard(transactions: Transaction[]) {
  const totalReceitas = useMemo(
    () =>
      transactions
        .filter((t) => t.tipo === "receita")
        .reduce((acc, t) => acc + Number(t.valor), 0),
    [transactions]
  );

  const totalDespesas = useMemo(
    () =>
      transactions
        .filter((t) => t.tipo === "despesa")
        .reduce((acc, t) => acc + Number(t.valor), 0),
    [transactions]
  );

  const saldo = totalReceitas - totalDespesas;

  const dadosGrafico = useMemo(() => {
    const despesas = transactions.filter((t) => t.tipo === "despesa");
    const grouped = despesas.reduce(
      (acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      fill: CORES_CATEGORIAS[name] || "#8884d8",
    }));
  }, [transactions]);

  return { totalReceitas, totalDespesas, saldo, dadosGrafico };
}
