"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useDashboard } from "@/hooks/useDashboard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MESES } from "@/lib/constants";
import { formatMonthYear } from "@/lib/utils";

export default function DashboardPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const { transactions, loading } = useTransactions({ month, year });
  const { totalReceitas, totalDespesas, saldo, dadosGrafico } =
    useDashboard(transactions);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-muted-foreground capitalize">
            {formatMonthYear(month, year)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={String(month)}
            onValueChange={(v) => setMonth(Number(v))}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MESES.map((m, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(year)}
            onValueChange={(v) => setYear(Number(v))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <SummaryCards
        totalReceitas={totalReceitas}
        totalDespesas={totalDespesas}
        saldo={saldo}
        loading={loading}
      />

      <CategoryPieChart data={dadosGrafico} loading={loading} />
    </div>
  );
}
