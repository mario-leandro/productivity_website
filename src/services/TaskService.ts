import { sendRequest } from "@/src/lib/api";
import { Task, CreateTaskData, TaskStatus } from "@/src/types/task";

export const taskService = {
  list: () =>
    sendRequest<Task[]>("/tasks", {
      token: localStorage.getItem("token") || "",
    }),

  create: (data: CreateTaskData) =>
    sendRequest("/tasks", {
      method: "POST",
      token: localStorage.getItem("token") || "",
      data,
    }),

  updateStatus: (id: number, status: TaskStatus, position: number) =>
    sendRequest(`/tasks/status`, {
      method: "PATCH",
      token: localStorage.getItem("token") || "",
      data: { id, status, position },
    }),
};
