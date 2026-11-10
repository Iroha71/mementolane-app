import { Task } from "@/models/task.model";
import {
  CalendarDaysIcon,
  HammerIcon,
  LucideIcon,
  NotebookPenIcon,
  PackageIcon,
  SearchCheckIcon,
} from "lucide-react";

export interface StatusGroup {
  name: Task["status"];
  label: string;
  icon: LucideIcon;
}

export const STATUSES: StatusGroup[] = [
  { name: "planning", label: "予定", icon: NotebookPenIcon },
  { name: "thisweek", label: "今週やること", icon: CalendarDaysIcon },
  { name: "wip", label: "作業中", icon: HammerIcon },
  { name: "reviewing", label: "レビュー中", icon: SearchCheckIcon },
  { name: "delivering", label: "検収中", icon: PackageIcon },
];
