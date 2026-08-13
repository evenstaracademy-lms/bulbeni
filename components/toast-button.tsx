"use client";

import { useToast } from "@/components/toast";

export function ToastButton({ children, message, className, label }: { children: React.ReactNode; message: string; className?: string; label?: string }) {
  const { showToast } = useToast();
  return <button className={className} onClick={() => showToast(message)} aria-label={label}>{children}</button>;
}
