import { Plus, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-row p-6 gap-4">
      <div className="w-full flex flex-row justify-between items-center gap-3">
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Olá, Usuario</h1>
            <p className="text-sm">Terça-feira, 30 de Junho de 2026 • Seu dia está excelente. Você completou 1 de 5 tarefas!</p>
        </div>

        <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-2 bg-[var(--surface)] rounded-xl p-1.5">
                <Search size={15} className="text-[var(--text)]" />
                <input
                    type="text"
                    placeholder="Buscar tarefas"
                    className="bg-[var(--surface)] text-[var(--text)]"
                />
            </div>

            <button className="flex flex-row justify-center items-center gap-1.5 bg-[var(--primary)] text-white text-sm p-2 rounded-xl">
                <Plus size={15} />
                Nova Tarefa
            </button>
        </div>
      </div>
    </div>
  );
}