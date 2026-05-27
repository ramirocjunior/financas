export type TipoTransacao = "receita" | "despesa";

export type Categoria =
  | "Alimentação"
  | "Transporte"
  | "Moradia"
  | "Lazer"
  | "Saúde"
  | "Educação"
  | "Salário"
  | "Freelance"
  | "Outros";

export interface Transaction {
  id: string;
  user_id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoTransacao;
  categoria: Categoria;
  created_at: string;
  updated_at: string;
}

export type TransactionInsert = Omit<
  Transaction,
  "id" | "user_id" | "created_at" | "updated_at"
>;
export type TransactionUpdate = Partial<TransactionInsert>;

export interface FilterState {
  month: number;
  year: number;
  categoria: Categoria | "todas";
  search: string;
}
