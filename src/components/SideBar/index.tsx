"use client";

import {
  Calendar,
  FileText,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SideBar() {
  const [activePage, setActivePage] = useState("Dashboard");

  const arrNavItems = [
    { title: "Dashboard", icon: <LayoutDashboard />, startsActive: true },
    { title: "Agenda", icon: <Calendar />, startsActive: false },
    { title: "Tarefas", icon: <SquareCheckBig />, startsActive: false },
    { title: "Notas", icon: <FileText />, startsActive: false },
  ];

  return (
    <div className="w-64 h-[calc(100%-80px)] flex flex-col justify-between border-r border-[var(--surface)] p-4">
      <div className="flex flex-col gap-1.5">
        {arrNavItems.map((item) => (
          <button
            key={item.title}
            onClick={() => setActivePage(item.title)}
            className={`
                flex gap-2 p-1.5 rounded-xl transition-colors
                ${
                  activePage === item.title
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--text-secundary)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                }
                `}
          >
            {item.icon}
            {item.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button className="flex flex-row gap-2 p-1.5 rounded-xl transition-colors text-[var(--text)] hover:bg-[var(--surface)] hover:text-[var(--text)]">
          <Settings />
          Configurações
        </button>

        <div className="flex flex-row bg-[var(--surface)] items-center rounded-xl p-4 gap-2">
          <User className="text-[var(--text)]" size={35} />

          <div className="flex flex-col">
            <span className="text-sm text-[var(--text)]">Mario Marques</span>
            <span className="text-sm text-[var(--text)]">premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}
