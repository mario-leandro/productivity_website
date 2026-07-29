import { sendRequest } from "@/src/lib/api";
import { Task, CreateTaskData, TaskStatus } from "@/src/types/task";

export const taskService = {
  list: (token: string) => sendRequest<Task[]>("/tasks", { token }),

  create: (token: string, data: CreateTaskData) =>
    sendRequest("/tasks", {
      method: "POST",
      token,
      data,
    }),

  updateStatus: (
    token: string,
    id: number,
    status: TaskStatus,
    position: number,
  ) =>
    sendRequest(`/tasks/${id}/status`, {
      method: "PATCH",
      token,
      data: { status, position },
    }),
};
