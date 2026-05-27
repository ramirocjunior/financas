"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

interface CategoryPieChartProps {
  data: ChartData[];
  loading: boolean;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg p-3 shadow-sm">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(payload[0].value ?? 0)}
        </p>
      </div>
    );
  }
  return null;
};

export function CategoryPieChart({ data, loading }: CategoryPieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Despesas por categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
            Nenhuma despesa registrada neste período.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                outerRadius={110}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
