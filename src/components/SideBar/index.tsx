"use client";

import {
  Calendar,
  FileText,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface SideBarProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

export default function SideBar({ setSidebarOpen, sidebarOpen }: SideBarProps) {
  const [activePage, setActivePage] = useState("Dashboard");

  const arrNavItems = [
    { title: "Dashboard", icon: <LayoutDashboard />, startsActive: true },
    { title: "Agenda", icon: <Calendar />, startsActive: false },
    { title: "Tarefas", icon: <SquareCheckBig />, startsActive: false },
    { title: "Notas", icon: <FileText />, startsActive: false },
  ];

  return (
    <div
      className={`
        fixed
        top-0
        left-0
        z-50

        flex flex-col justify-between

        w-64
        h-full

        border-r
        border-[var(--surface)]

        bg-[var(--background)]

        p-4

        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:translate-x-0
        md:static
      `}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-end ml-4 mt-4 mb-8 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <X />
        </button>
      </div>

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
        <button
          onClick={() => setActivePage("Configurações")}
          className={`
            flex gap-2 p-1.5 rounded-xl transition-colors
            ${
              activePage === "Configurações"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secundary)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            }
          `}
        >
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
