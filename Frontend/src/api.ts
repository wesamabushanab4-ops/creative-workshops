import type { Instructor, Workshop, WorkshopPayload } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(result?.message ?? "The request failed. Please try again.");
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  getInstructors: () => request<Instructor[]>("/instructors"),
  getWorkshops: (instructorId: string) =>
    request<Workshop[]>(`/workshops?instructorId=${encodeURIComponent(instructorId)}`),
  getWorkshop: (id: string) => request<Workshop>(`/workshops/${id}`),
  createWorkshop: (payload: WorkshopPayload) =>
    request<Workshop>("/workshops", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateWorkshop: (id: string, payload: WorkshopPayload) =>
    request<Workshop>(`/workshops/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteWorkshop: (id: string) =>
    request<void>(`/workshops/${id}`, { method: "DELETE" }),
};
