export default function Timeline() {
  const timeline = [
    {
      id: 1,
      date: "2026-06-24",
      priority: "Alta",
      title: "Finalizar MVP",
      description: "Concluir todas as tarefas do MVP.",
      color: "#f43f5e",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          completed: false,
        },
        {
          id: 2,
          title: "Task 2",
          completed: true,
        },
      ],
    },
    {
      id: 2,
      date: "2026-06-25",
      priority: "Baixa",
      title: "Comprar presentes",
      description: "Comprar presentes para o aniversário.",
      color: "#eee",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          completed: false,
        },
        {
          id: 2,
          title: "Task 2",
          completed: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <TimelineHeader />

      <div className="relative">
        {timeline.map((item) => (
          <TimelineItem key={item.id} item={item} />
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

function TimelineItem({ item }: { item: any }) {
  return (
    <div className="flex gap-6 relative">
      {/* Linha vertical */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-600" />

      {/* Bolinha */}
      <div className="flex-shrink-0 relative z-10">
        <div
          className={`w-2 h-2 rounded-full bg-[var(${item.color})] mt-2 ml-3`}
        />
      </div>

      <div className="pb-14">
        {/* Topo (data + label) */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">{item.date}</span>

          <span
            className={`text-[${item.color}] text-[10px] uppercase font-semibold px-2 py-0.5 rounded`}
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
