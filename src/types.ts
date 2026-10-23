import { z } from "zod";

export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Status = "WAITING" | "INPROGRESS" | "DONE";
export type Role = "USER" | "ADMIN";

export type Project = {
  name: string;
  tasks: Task[];
  userId: string;
};

export type Task = {
  name: string;
  description: string;
  dueDate: Date;
  projectId: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
};

export const projectSchema = z.object({
  name: z.string().min(3),
});

export const taskSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  dueDate: z.coerce.date(),
  projectId: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["WAITING", "INPROGRESS", "DONE"]),
});