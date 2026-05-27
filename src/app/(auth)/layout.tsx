import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-7 w-7 text-primary" />
        <span className="font-bold text-2xl text-gray-900">Finanças</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
