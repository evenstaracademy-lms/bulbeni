import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="BULBENI home">
      <Image
        className="brand-logo"
        src="/logo.png"
        alt="BULBENI"
        width={compact ? 145 : 160}
        height={compact ? 109 : 120}
        priority
      />
    </Link>
  );
}
