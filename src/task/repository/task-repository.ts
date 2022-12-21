import { Task } from "../domain/task";

export interface ITaskRepository {
  findById(id: Task["id"]): Promise<Task | undefined>;
  findAllUserCanSee(userId: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
}
