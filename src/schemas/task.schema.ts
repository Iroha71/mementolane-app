import z from "zod";

export const taskSchema = z.object({
  title: z.string(),
  status: z.enum(["planning", "thisweek", "wip", "reviewing", "delivering"]),
  startAt: z.iso.date().nullable(),
  dueAt: z.iso.date().nullable(),
  completed: z.union([z.literal(0), z.literal(1)]),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export interface Task {
  id: number;
  title: string;
  status: "planning" | "thisweek" | "wip" | "reviewing" | "delivering";
  startAt: Date | null;
  dueAt: Date | null;
  completed: boolean;
  createdAt: Date;
}
