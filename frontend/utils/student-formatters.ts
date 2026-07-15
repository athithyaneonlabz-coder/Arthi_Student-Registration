import type { StudentStatus, StudentYear } from "@/types/student";

export function formatDate(value: string): string {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));
}

export function formatYear(year: StudentYear): string {
  return `Year ${year}`;
}

export function getStatusColor(status: StudentStatus): "success" | "default" {
  return status === "Active" ? "success" : "default";
}