export type TaskStatus = "A Fazer" | "Executando" | "Concluído";

export type TaskPriority = "Baixo" | "Médio" | "Alto";

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: TaskPriority;
  due_date?: string;
}

export interface UpdateTaskStatusData {
  id: number;
  status: TaskStatus;
  position: number;
}
