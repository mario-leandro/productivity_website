import { Bell, Sun } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full h-20 flex flex-row justify-between items-center border-b border-[var(--surface)] px-6">
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
          className="bg-[var(--surface)] hover:bg-slate-700 p-3 rounded-xl cursor-pointer transition-colors duration-200"
        >
          <Sun className="text-yellow-500" size={15} />
        </button>
      </div>
    </div>
  );
}
