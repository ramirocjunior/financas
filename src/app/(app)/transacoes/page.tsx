"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { ExportButton } from "@/components/transactions/ExportButton";
import { Button } from "@/components/ui/button";
import type { Transaction, TransactionInsert } from "@/types";

export default function TransacoesPage() {
  const {
    transactions,
    loading,
    error,
    filters,
    setFilters,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const handleSubmit = async (data: TransactionInsert) => {
    try {
      if (editing) {
        await updateTransaction(editing.id, data);
        toast.success("Transação atualizada com sucesso!");
      } else {
        await createTransaction(data);
        toast.success("Transação criada com sucesso!");
      }
      setFormOpen(false);
      setEditing(null);
    } catch {
      toast.error("Erro ao salvar transação. Tente novamente.");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditing(transaction);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Transação excluída.");
    } catch {
      toast.error("Erro ao excluir transação.");
    }
  };

  const handleNewTransaction = () => {
    setEditing(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
        <div className="flex items-center gap-2">
          <ExportButton transactions={transactions} />
          <Button onClick={handleNewTransaction}>
            <Plus className="h-4 w-4 mr-2" />
            Nova transação
          </Button>
        </div>
      </div>

      <TransactionFilters filters={filters} onFiltersChange={setFilters} />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <TransactionTable
        transactions={transactions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditing(null);
        }}
        transaction={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
