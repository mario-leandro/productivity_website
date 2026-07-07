import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--surface)] bg-[var(--surface)] p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h2 className={`text-xl font-semibold text-[var(--text)] ${className}`}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <p className={`text-sm text-[var(--text-secundary)] ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}
