import { Task } from "@/src/types/task";

export default function Timeline({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (task: Task) => void;
}) {
  return (
    <div className="flex flex-col">
      <TimelineHeader />

      <div className="relative">
        {tasks.map((item) => (
          <TimelineItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function TimelineHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-semibold text-lg">Linha do Tempo de Entregas</h2>

      <span className="text-sm text-gray-400">Junho de 2026</span>
    </div>
  );
}

function TimelineItem({
  item,
  onSelect,
}: {
  item: Task;
  onSelect: (task: Task) => void;
}) {
  return (
    <div className="flex gap-6 relative" onClick={() => onSelect(item)}>
      {/* Linha vertical */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-600" />

      {/* Bolinha */}
      <div className="flex-shrink-0 relative z-10">
        <div className={`w-2 h-2 rounded-full bg-[var(--primary)] mt-2 ml-3`} />
      </div>

      <div className="w-60 h-25 bg-(--surface-three) p-2 rounded-md border border-(--surface-four)">
        {/* Topo (data + label) */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">{item.due_date}</span>

          <span
            className={`text-[${item.priority}] text-[10px] uppercase font-semibold px-2 py-0.5 rounded`}
          >
            {item.priority}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">{item.title}</h3>

          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
