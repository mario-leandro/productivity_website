"use client";
import Modal from "@/src/components/ui/Modal";
import Timeline from "@/src/components/ui/Timeline";
import {
  Archive,
  Calendar,
  CheckCircle,
  ChevronRight,
  Copy,
  Funnel,
  GitCommitHorizontal,
  Kanban,
  List,
  Pencil,
  Plus,
  Rocket,
  Search,
  SquareCheckBig,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { taskService } from "@/src/services/TaskService";
import { Task } from "@/src/types/task";

export default function Tarefas() {
  const [activeTab, setActiveTab] = useState("Lista");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Média");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    await taskService.create({
      title,
      description,
      priority,
      due_date: dueDate,
    });

    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setPriority("Média");
    setDueDate("");
  };

  async function loadTasks() {
    try {
      const response = await taskService.list();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const modalTaskList = [
    {
      id: 1,
      title: "Lista",
      icon: <List size={12} />,
      active: true,
    },
    {
      id: 2,
      title: "Kanban",
      icon: <Kanban size={12} />,
      active: false,
    },
    {
      id: 3,
      title: "Timeline",
      icon: <GitCommitHorizontal size={12} />,
      active: false,
    },
  ];

  const isActive = "bg-violet-500/30 text-[var(--text)]";

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
          <div className="h-8 bg-[var(--surface)] flex flex-row justify-center items-center gap-2 border border-[var(--surface-four)] rounded-xl">
            {modalTaskList.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.title)}
                className={`h-full flex flex-row justify-center items-center rounded-xl`}
              >
                <p
                  className={`flex flex-row justify-center items-center gap-1 text-xs rounded-xl cursor-pointer p-2 ${activeTab === item.title ? isActive : "text-[var(--text-secundary)]"}`}
                >
                  {item.icon}
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center cursor-pointer"
          >
            <Plus size={16} />
            Criar tarefa
          </button>
        </div>
      </div>

      {/* Modal para criar tarefa */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Criar Nova Tarefa</h2>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-xs text-(--text-secundary) font-semibold"
            >
              Titulo da Tarefa
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 rounded-xl text-xs bg-[var(--surface-three)]"
              placeholder="Ex: Estudar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-xs text-(--text-secundary) font-semibold"
            >
              Descrição da Tarefa
            </label>
            <textarea
              className="w-full min-h-20 p-2 rounded-xl text-xs bg-[var(--surface-three)] resize-y"
              name="description"
              id="description"
              placeholder="Ex: Estudar algoritmos"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="priority"
                className="text-xs text-(--text-secundary) font-semibold"
              >
                Prioridade
              </label>
              <select
                className="w-full p-2 rounded-xl text-xs bg-[var(--surface-three)]"
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Alta" className="bg-(--surface-three)">
                  Alta
                </option>
                <option
                  value="Média"
                  className="bg-(--surface-three)"
                  defaultChecked
                >
                  Média
                </option>
                <option value="Baixa" className="bg-(--surface-three)">
                  Baixa
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="due-date"
                className="text-xs text-(--text-secundary) font-semibold"
              >
                Vencimento
              </label>
              <input
                type="date"
                id="due-date"
                className="w-full p-2 rounded-xl text-xs bg-[var(--surface-three)]"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-xs text-(--text-secundary) font-semibold"
              >
                Categoria
              </label>
              <select
                className="w-full p-2 rounded-xl text-xs bg-[var(--surface-three)]"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="work" className="bg-(--surface-three)">
                  Trabalho
                </option>
                <option
                  value="personal"
                  className="bg-(--surface-three)"
                  defaultChecked
                >
                  Pessoal
                </option>
                <option value="study" className="bg-(--surface-three)">
                  Estudo
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="tags"
                className="text-xs text-(--text-secundary) font-semibold"
              >
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                id="tags"
                className="w-full p-2 rounded-xl text-xs bg-[var(--surface-three)]"
                placeholder="Ex: Trabalho, Pessoal, Estudo"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="checklist"
              className="text-xs text-(--text-secundary) font-semibold"
            >
              Checklist (uma sub-tarefa por linha)
            </label>
            <div className="flex flex-row gap-2">
              <textarea
                name="checklist"
                id="checklist"
                className="w-full min-h-20 p-2 rounded-xl text-xs bg-[var(--surface-three)] resize-y"
                placeholder={`Estudar algoritmos
Revisar React
Ler documentação`}
                value={checklist}
                onChange={(e) => setChecklist(e.target.value)}
              ></textarea>
            </div>
          </div> */}
          </div>

          <div className="flex flex-row justify-end items-center gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-xs px-4 py-2 rounded-xl bg-[var(--surface-three)] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateTask}
              className="text-xs px-4 py-2 rounded-xl bg-[var(--secundary)] text-white cursor-pointer"
            >
              Criar Tarefa
            </button>
          </div>
        </div>
      </Modal>

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

      {/* Modal para exibir informações da tarefa */}
      {selectedTask && (
        <Modal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          isOpen={true}
          setIsOpen={() => setSelectedTask(null)}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              Prioridade:{" "}
              <span className="text-(--text)">
                {selectedTask.priority.charAt(0).toUpperCase() +
                  selectedTask.priority.slice(1)}
              </span>
            </div>

            <div>
              <button className="cursor-pointer hover:bg-(--surface-three) duration-75 rounded-lg p-2">
                <Copy className="text-(--text)" size={15} />
              </button>
              <button className="cursor-pointer hover:bg-(--surface-three) duration-75 rounded-lg p-2">
                <Archive className="text-(--text)" size={15} />
              </button>
              <button className="cursor-pointer hover:bg-(--surface-three) duration-75 rounded-lg p-2">
                <Trash className="text-red-500 rounded-lg" size={15} />
              </button>
            </div>
          </div>

          <hr className="text-(--surface-four) my-4" />

          <div className="w-full flex flex-col gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-(--text)">
                {selectedTask?.title}
              </h2>
              <p className="text-sm text-(--text-secundary)">
                {selectedTask?.description}
              </p>
            </div>
          </div>

          <button
            className="w-full border border-(--surface-four) rounded-lg p-2"
            onClick={() => setSelectedTask(null)}
          >
            Fechar Detalhes
          </button>
        </Modal>
      )}

      {
        tasks.length > 0 ?
          renderTasksView(activeTab, tasks, setSelectedTask)
          :
          (
            <div className="flex flex-col items-center justify-center">
              <p>Nenhuma tarefa encontrada</p>
            </div>
          )

      }
    </div>
  );
}

function renderTasksView(activeTab: string, tasks: Task[], setSelectedTask: (task: Task) => void) {
  switch (activeTab) {
    case "Lista":
      return (
        <TaskComponentList
          tasks={tasks}
          onSelect={setSelectedTask}
        />
      );
    case "Kanban":
      return (
        <TaskComponentKanban
          tasks={tasks}
          onSelect={setSelectedTask}
        />
      );
    case "Timeline":
      return (
        <TaskComponentTimeline
          tasks={tasks}
          onSelect={setSelectedTask}
        />
      );
    default:
      return null;
  }
}

function TaskComponentList({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (task: Task) => void;
}) {
  return (
    <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-2xl p-6">
      {tasks.map((task) => (
        <div
          className="h-15 flex flex-row justify-between bg-[var(--surface-three)] border border-[var(--surface-four)] rounded-2xl"
          key={task.id}
        >
          <div className="flex flex-row justify-center items-center p-4">
            <input type="checkbox" name="completed" id="completed" />
          </div>

          <div
            className="flex-1 flex flex-col justify-center items-start"
            onClick={() => {
              onSelect(task);
            }}
          >
            <p className="text-sm text-[var(--text)] font-semibold">
              {task.title}
            </p>
            <p className="text-xs text-[var(--text-secundary)]">
              {task.description}
            </p>
          </div>

          <div className="flex flex-row gap-3 p-4 items-center">
            {/* <div className="flex flex-row items-center justify-center gap-1 p-1 rounded-sm border border-[var(--surface-four)]">
              <p className="text-xs text-[var(--text-secundary)]">
                {task.tags}
              </p>
            </div> */}
            <div className="flex flex-row items-center justify-center gap-4 text-xs">
              {/* <span className="flex flex-row items-center justify-center gap-1 text-[var(--text-secundary)]">
                <SquareCheckBig size={10} />
                {
                  task.subtask?.filter((subtask) => subtask.completed).length
                }/ {task.subtask?.length}
              </span> */}
              <p className="text-[var(--text-secundary)]">{task.due_date}</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              {/* Prioridade */}
              <span className="bg-yellow-400/43 text-white text-xs uppercase rounded-xl p-2">
                {task.priority}
              </span>

              {/* Status */}
              <span className="text-xs p-2 bg-blue-500/20 border border-blue-500/40 rounded-sm">
                {task.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskComponentKanban({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (task: Task) => void;
}) {
  return (
    <div className="flex flex-row gap-4">
      {tasks.map((task) => (
        <div
          className="h-100 w-100 bg-[var(--surface)] border-t-4 border-blue-500 rounded-2xl"
          onClick={() => onSelect(task)}
          key={task.id}
        >
          <div className="flex flex-row items-center justify-between p-4">
            <p className="flex flex-row items-center text-xs text-[var(--text)] font-semibold gap-2">
              {task.status}
              <Calendar size={16} />
            </p>
            <span className="text-xs text-[var(--text-secundary)] bg-[var(--surface-three)] w-6 h-6 flex flex-row items-center justify-center rounded-full">
              1
            </span>
          </div>
          <div className="flex flex-col gap-4 px-4">
            {tasks
              .filter((task) => task.status === "A Fazer")
              .map((task) => (
                <div
                  className="flex flex-col justify-between bg-[var(--surface-three)] border border-[var(--surface-four)] rounded-2xl"
                  key={task.id}
                  onClick={() => onSelect(task)}
                >
                  <div className="flex flex-col gap-2 p-3">
                    <div className="flex flex-row justify-between items-center">
                      <span className="bg-yellow-400/20 border border-yellow-400/60 text-yellow-400 text-[10px] uppercase rounded p-1">
                        {task.priority}
                      </span>

                      <div className="flex flex-row">
                        <button className="flex flex-row items-center justify-center cursor-pointer">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-start">
                      <p className="text-sm text-[var(--text)] font-semibold">
                        {task.title}
                      </p>
                      <p className="text-xs text-[var(--text-secundary)]">
                        {task.description}
                      </p>
                    </div>

                    <hr className="border-[var(--surface-four)]" />

                    <div className="flex flex-row justify-between items-center">
                      {/* <div className="flex flex-row items-center justify-center gap-1 px-1">
                      <p className="text-xs text-[var(--text-secundary)]">
                        Estudos
                      </p>
                    </div> */}

                      <div className="flex flex-row items-center justify-center gap-1 p-1 rounded-sm">
                        <p className="text-xs text-[var(--text-secundary)]">
                          {task.due_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="h-100 w-100 bg-[var(--surface)] border-t-4 border-yellow-500 rounded-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <p className="flex flex-row items-center text-xs text-[var(--text)] font-semibold gap-2">
            Executando
            <Rocket size={16} />
          </p>
          <span className="text-xs text-[var(--text-secundary)] bg-[var(--surface-three)] w-6 h-6 flex flex-row items-center justify-center rounded-full">
            0
          </span>
        </div>
        <div className="flex flex-col gap-4 px-4"></div>
      </div>
      {/* <div className="h-100 w-100 bg-[var(--surface)] border-t-4 border-purple-500 rounded-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <p className="flex flex-row items-center text-xs text-[var(--text)] font-semibold gap-2">
            Revisão
            <Pencil size={16} />
          </p>
          <span className="text-xs text-[var(--text-secundary)] bg-[var(--surface-three)] w-6 h-6 flex flex-row items-center justify-center rounded-full">
            0
          </span>
        </div>
        <div className="flex flex-col gap-4 px-4"></div>
      </div> */}
      <div className="h-100 w-100 bg-[var(--surface)] border-t-4 border-green-500 rounded-2xl">
        <div className="flex flex-row items-center justify-between p-4">
          <p className="flex flex-row items-center text-xs text-[var(--text)] font-semibold gap-2">
            Concluído
            <CheckCircle size={16} />
          </p>
          <span className="text-xs text-[var(--text-secundary)] bg-[var(--surface-three)] w-6 h-6 flex flex-row items-center justify-center rounded-full">
            0
          </span>
        </div>
        <div className="flex flex-col gap-4 px-4"></div>
      </div>
    </div>
  );
}

function TaskComponentTimeline({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (task: Task) => void;
}) {
  return (
    <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-2xl p-6">
      <Timeline tasks={tasks} onSelect={onSelect} />
    </div>
  );
}
