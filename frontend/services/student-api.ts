import type { Student, StudentFormValues } from "@/types/student";

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const studentApi = {
  list: () => request<Student[]>("/students"),
  create: (payload: StudentFormValues) =>
    request<Student>("/students", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  update: (id: string, payload: StudentFormValues) =>
    request<Student>(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    }),
  remove: (id: string) =>
    request<void>(`/students/${id}`, {
      method: "DELETE"
    })
};