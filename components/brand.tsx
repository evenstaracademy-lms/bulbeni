import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="BULBENI home">
      <span className="brand-mark"><Sparkles size={compact ? 16 : 18} strokeWidth={2.4} /></span>
      <span>BULBENI</span>
    </Link>
  );
}
