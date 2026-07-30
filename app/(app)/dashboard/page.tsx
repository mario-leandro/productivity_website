import {
  BottomCards,
  FirstCards,
  MiddleCards,
} from "@/src/components/CardsInDash";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("pt-BR", options);

  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Olá, Usuario</h1>
          <p className="text-sm text-[var(--text-secundary)]">
            {formattedDate} • Seu dia está excelente. Você completou 1 de 5
            tarefas!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-72 h-8 flex flex-row items-center gap-2 bg-[var(--surface)] rounded-xl p-1.5">
            <Search size={15} className="text-[var(--text-secundary)]" />
            <input
              type="text"
              placeholder="Pesquisar em tudo..."
              className="bg-[var(--surface)] text-[var(--text)] placeholder:text-(--text-secundary) outline-none text-xs"
            />
          </div>

          <Link
            href={"/tarefas"}
            className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center cursor-pointer"
          >
            <Plus size={15} />
            Nova Tarefa
          </Link>
        </div>
      </div>

      <FirstCards />
      <MiddleCards />
      <BottomCards />
    </div>
  );
}
