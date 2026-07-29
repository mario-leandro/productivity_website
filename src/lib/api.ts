import { RequestOptions } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendRequest<T = any>(
  endpoint: string,
  { method = "GET", data }: RequestOptions = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  let json: any = null;

  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    throw new Error(json?.message || "Erro na requisição");
  }

  return json as T;
}
