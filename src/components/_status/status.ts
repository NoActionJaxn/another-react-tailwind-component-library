export type Status = "info" | "success" | "warning" | "danger";

/** Urgent statuses interrupt screen readers; the others wait their turn. */
export function statusRole(status: Status | undefined) {
  return status === "warning" || status === "danger" ? "alert" : "status";
}
