import Header from "@/src/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showThemeToggle showNotifications={false} />

      <main className="flex-1 flex items-center justify-center px-6">
        {children}
      </main>

      <footer className="h-16 flex items-center justify-center text-sm text-[var(--text-secundary)] border-t border-[var(--surface)]">
        © 2026 Syncro. Todos os direitos reservados.
      </footer>
    </div>
  );
}
