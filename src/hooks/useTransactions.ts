"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import type { Transaction, TransactionInsert, TransactionUpdate, FilterState } from "@/types";

export function useTransactions(initialFilters?: Partial<FilterState>) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    month: initialFilters?.month ?? new Date().getMonth() + 1,
    year: initialFilters?.year ?? new Date().getFullYear(),
    categoria: initialFilters?.categoria ?? "todas",
    search: initialFilters?.search ?? "",
  });

  const fetchTransactions = useCallback(async () => {
    const supabase = createClient();
    setLoading(true);
    setError(null);
    try {
      const startDate = format(
        new Date(filters.year, filters.month - 1, 1),
        "yyyy-MM-dd"
      );
      const endDate = format(
        new Date(filters.year, filters.month, 0),
        "yyyy-MM-dd"
      );

      let query = supabase
        .from("transactions")
        .select("*")
        .gte("data", startDate)
        .lte("data", endDate)
        .order("data", { ascending: false });

      if (filters.categoria && filters.categoria !== "todas") {
        query = query.eq("categoria", filters.categoria);
      }
      if (filters.search) {
        query = query.ilike("descricao", `%${filters.search}%`);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setTransactions((data as Transaction[]) || []);
    } catch {
      setError("Erro ao carregar transações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = async (data: TransactionInsert) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const { error } = await supabase
      .from("transactions")
      .insert({ ...data, user_id: user.id });
    if (error) throw error;
    await fetchTransactions();
  };

  const updateTransaction = async (id: string, data: TransactionUpdate) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("transactions")
      .update(data)
      .eq("id", id);
    if (error) throw error;
    await fetchTransactions();
  };

  const deleteTransaction = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);
    if (error) throw error;
    await fetchTransactions();
  };

  return {
    transactions,
    loading,
    error,
    filters,
    setFilters,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  };
}
