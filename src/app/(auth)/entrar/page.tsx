import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Entrar — Finanças" };

export default function EntrarPage() {
  return <LoginForm />;
}
