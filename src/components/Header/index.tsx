import { useTheme } from "next-themes";
import { Bell, Sun, Menu, Moon } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

export default function Header({ setSidebarOpen, sidebarOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-20 flex flex-row justify-between items-center border-b border-[var(--surface)] px-6">
      <button
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

      <h1 className="text-2xl font-bold text-[var(--text)]">Syncro</h1>

      <div className="flex flex-row gap-6">
        <button
          id="notificationsBtn"
          className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl cursor-pointer transition-colors duration-200"
        >
          <Bell className="text-[var(--text)]" size={15} />
        </button>

        <button
          id="themeBtn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl cursor-pointer transition-colors duration-200"
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun className="text-yellow-500" size={15} />}
        </button>
      </div>
    </div>
  );
}
