import type { Categoria } from "@/types";

export const CATEGORIAS: Categoria[] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Salário",
  "Freelance",
  "Outros",
];

export const TIPOS = {
  receita: "Receita",
  despesa: "Despesa",
} as const;

export const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const CORES_CATEGORIAS: Record<string, string> = {
  Alimentação: "#FF6B6B",
  Transporte: "#4ECDC4",
  Moradia: "#45B7D1",
  Lazer: "#96CEB4",
  Saúde: "#FFEAA7",
  Educação: "#DDA0DD",
  Salário: "#98FB98",
  Freelance: "#87CEEB",
  Outros: "#B0BEC5",
};
