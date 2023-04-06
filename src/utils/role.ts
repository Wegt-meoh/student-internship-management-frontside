import { SystemRole } from "@/types/role";

export function saveRole(role: string) {
  localStorage.setItem("role", role);
}

export function getRole() {
  return localStorage.getItem("role");
}

export function removeRole() {
  localStorage.removeItem("role");
}
