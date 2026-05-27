import type { Transaction } from "@/types";

export function exportToCSV(
  transactions: Transaction[],
  filename = "transacoes"
): void {
  const BOM = "﻿";
  const headers = ["Data", "Descrição", "Categoria", "Tipo", "Valor"];

  const rows = transactions.map((t) => [
    t.data,
    `"${t.descricao.replace(/"/g, '""')}"`,
    t.categoria,
    t.tipo === "receita" ? "Receita" : "Despesa",
    Number(t.valor).toFixed(2).replace(".", ","),
  ]);

  const csv =
    BOM + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
