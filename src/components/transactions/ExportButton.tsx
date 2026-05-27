"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/csv";
import type { Transaction } from "@/types";

interface ExportButtonProps {
  transactions: Transaction[];
}

export function ExportButton({ transactions }: ExportButtonProps) {
  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <Button variant="outline" onClick={handleExport} disabled={transactions.length === 0}>
      <Download className="h-4 w-4 mr-2" />
      Exportar CSV
    </Button>
  );
}
