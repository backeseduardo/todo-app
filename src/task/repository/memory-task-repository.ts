import { Task } from "../domain/task";
import { ITaskRepository } from "./task-repository";

export class MemoryTaskRepository implements ITaskRepository {
  public tasks: { [key: Task["id"]]: Task } = {};

  findById(id: Task["id"]): Promise<Task | undefined> {
    const task = this.tasks[id];

    return Promise.resolve(task);
  }

  findAllUserCanSee(userId: string): Promise<Task[]> {
    const tasks = Object.values(this.tasks).filter((task) => {
      if (task.createdBy.id === userId) {
        return true;
      }

      if (task.viewers.has(userId)) {
        return true;
      }

      return false;
    });

    return Promise.resolve(tasks);
  }

  async save(task: Task): Promise<Task> {
    this.tasks[task.id] = { ...task };

    return Promise.resolve(task);
  }
}
