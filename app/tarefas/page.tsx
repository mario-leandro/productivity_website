import {
  Funnel,
  GitCommitHorizontal,
  Kanban,
  List,
  Plus,
  Search,
} from "lucide-react";

export default function Tarefas() {
  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      <div className="flex flex-row justify-between items-center py-6">
        <div className="flex flex-col">
          <p className="text-2xl text-[var(--text)] font-semibold">
            Lista de tarefas
          </p>
          <p className="text-xs text-[var(--text-secundary)]">
            Gerencie suas entregas, atribua prioridades e colabore em checklists
            integrados
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="h-8 bg-[var(--surface)] flex flex-row justify-center items-center gap-2 rounded-xl shadow-md border border-[var(--surface-four)]">
            <div className="h-full flex flex-row justify-center items-center rounded-xl shadow-md border">
              <p className="flex flex-row justify-center items-center gap-1 bg-violet-500/30 text-xs text-[var(--text)] px-4 py-2 rounded-xl">
                <List size={12} />
                Lista
              </p>
            </div>
            <div className="h-full flex flex-row justify-center items-center">
              <p className="flex flex-row justify-center items-center gap-1 text-xs text-[var(--text-secundary)] p-2 rounded-xl">
                <Kanban size={12} />
                Kanban
              </p>
            </div>
            <div className="h-full flex flex-row justify-center items-center">
              <p className="flex flex-row justify-center items-center gap-1 text-xs text-[var(--text-secundary)] p-2 rounded-xl">
                <GitCommitHorizontal size={12} />
                Timeline
              </p>
            </div>
          </div>

          <button className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center">
            <Plus size={16} />
            Criar tarefa
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center bg-[var(--surface)] p-6 gap-4 rounded-2xl">
        {/* filtro de busca */}
        <div className="w-full flex flex-col bg-[var(--surface)]">
          <div className="w-full flex flex-row items-center bg-[var(--surface-three)] border border-[var(--surface-four)] p-2 rounded-xl gap-2">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full outline-none text-xs"
            />
          </div>
        </div>

        <Funnel size={24} />

        {/* filtro de prioridade */}
        <div className="w-1/6 flex flex-col bg-[var(--surface-three)] border border-[var(--surface-four)] rounded-xl">
          <select className="outline-none text-xs rounded-xl p-2">
            <option className="bg-[var(--surface-three)]" value="all">
              Todas as prioridades
            </option>
            <option className="bg-[var(--surface-three)]" value="high">
              Alta
            </option>
            <option className="bg-[var(--surface-three)]" value="medium">
              Média
            </option>
            <option className="bg-[var(--surface-three)]" value="low">
              Baixa
            </option>
          </select>
        </div>

        {/* filtro de categoria */}
        <div className="w-1/6 flex flex-col bg-[var(--surface-three)] border border-[var(--surface-four)] rounded-xl">
          <select className="outline-none text-xs rounded-xl p-2">
            <option className="bg-[var(--surface-three)]" value="all">
              Todas as categorias
            </option>
            <option className="bg-[var(--surface-three)]" value="work">
              Trabalho
            </option>
            <option className="bg-[var(--surface-three)]" value="personal">
              Pessoal
            </option>
            <option className="bg-[var(--surface-three)]" value="study">
              Estudo
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
