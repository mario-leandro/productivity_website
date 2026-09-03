import { sendRequest } from "@/src/lib/api";
import { Task, CreateTaskData, TaskStatus } from "@/src/types/task";

export const TaskService = {
  list: async () => {
    return await sendRequest<Task[]>("/tasks");
  },

  create: async (data: CreateTaskData) =>
    await sendRequest("/tasks", {
      method: "POST",
      data,
    }),

  updateStatus: async (id: number, status: TaskStatus, position: number) =>
    await sendRequest(`/tasks/status`, {
      method: "PATCH",
      data: { id, status, position },
    }),
};
