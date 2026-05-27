"use client";

import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDialog } from "./DeleteDialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types";

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => Promise<void>;
}

export function TransactionTable({
  transactions,
  loading,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm border rounded-lg bg-white">
        Nenhuma transação encontrada. Use os filtros acima ou crie uma nova.
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="hidden sm:table-cell">Categoria</TableHead>
            <TableHead className="hidden md:table-cell">Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                {formatDate(t.data)}
              </TableCell>
              <TableCell className="font-medium max-w-[180px] truncate">
                {t.descricao}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="outline" className="text-xs">
                  {t.categoria}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={t.tipo === "receita" ? "success" : "danger"}
                  className="text-xs"
                >
                  {t.tipo === "receita" ? "Receita" : "Despesa"}
                </Badge>
              </TableCell>
              <TableCell
                className={`text-right font-semibold whitespace-nowrap ${
                  t.tipo === "receita" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {t.tipo === "despesa" ? "−" : "+"}
                {formatCurrency(Number(t.valor))}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(t)}
                    aria-label="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <DeleteDialog
                    onConfirm={() => onDelete(t.id)}
                    description={`Excluir "${t.descricao}"? Esta ação não pode ser desfeita.`}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </DeleteDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
