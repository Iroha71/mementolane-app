import { Task } from "@/schemas/task.schema";
import {
  ArrowBigRight,
  HammerIcon,
  NotebookPenIcon,
  PackageIcon,
  SearchCheckIcon,
} from "lucide-react";

interface StatusIconProps {
  status: Task["status"];
}

export default function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case "planning":
      return <NotebookPenIcon />;
    case "thisweek":
      return <ArrowBigRight />;
    case "wip":
      return <HammerIcon />;
    case "reviewing":
      return <SearchCheckIcon />;
    case "delivering":
      return <PackageIcon />;
  }
}
