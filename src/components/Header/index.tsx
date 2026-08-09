"use client";

import { Bell, Sun, Menu, Moon, DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/src/contexts/AuthContext";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;

  showSidebarButton?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
}

export default function Header({
  sidebarOpen = false,
  setSidebarOpen,
  showSidebarButton = false,
  showNotifications = true,
  showThemeToggle = true,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full h-20 flex items-center justify-between border-b border-[var(--surface)] px-6 bg-[var(--background)]">
      <div className="flex items-center gap-3">
        {showSidebarButton && setSidebarOpen && (
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
        )}

        <h1 className="text-2xl font-bold text-[var(--text)]">Syncro</h1>
      </div>

      <div className="flex items-center gap-4">
        {showNotifications && (
          <button className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl transition-colors">
            <Bell className="text-[var(--text)]" size={15} />
          </button>
        )}

        {showThemeToggle && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl transition-colors"
          >
            {theme === "dark" ? (
              <Moon size={15} />
            ) : (
              <Sun className="text-yellow-500" size={15} />
            )}
          </button>
        )}

        <button
          onClick={logout}
          className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl transition-colors"
        >
          <DoorOpen className="text-red-500" size={15} />
        </button>
      </div>
    </header>
  );
}
