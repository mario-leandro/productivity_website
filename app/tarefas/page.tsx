import {
  Funnel,
  GitCommitHorizontal,
  Kanban,
  List,
  Plus,
  Search,
  SquareCheckBig,
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

      <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-2xl p-6">
        <div className="h-15 flex flex-row justify-between bg-[var(--surface-three)] border border-[var(--surface-four)] rounded-2xl">
          <div className="flex flex-row">
            <div className="flex flex-row justify-between items-center p-4">
              <input type="checkbox" name="completed" id="completed" />
              <div className="w-full flex flex-col"></div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <p className="text-sm text-[var(--text)] font-semibold">
                Fazer API do Syncro
              </p>
              <p className="text-xs text-[var(--text-secundary)]">
                Integrar API do Syncro com o sistema.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-3 p-4 items-center">
            <div className="flex flex-row items-center justify-center gap-1 p-1 rounded-sm border border-[var(--surface-four)]">
              <p className="text-xs text-[var(--text-secundary)]">#Backend</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-xs">
              <span className="flex flex-row items-center justify-center gap-1 text-[var(--text-secundary)]">
                <SquareCheckBig size={10} />
                2/5
              </span>
              <p className="text-[var(--text-secundary)]">2026-07-18</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              {/* Prioridade */}
              <span className="bg-yellow-400/43 text-white text-xs uppercase rounded-xl p-2">
                Média
              </span>

              {/* Status */}
              <span className="text-xs p-2 bg-blue-500/20 border border-blue-500/40 rounded-sm">
                A Fazer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
