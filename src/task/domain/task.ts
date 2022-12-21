import { User } from "../../user/domain/user";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done" | "archived";
  createdBy: User;
  viewers: Set<User["id"]>;
}

export type TaskResponse = Omit<Task, "createdBy" | "viewers">;
