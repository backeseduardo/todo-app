import { TaskResponse } from "../../domain/task";
import { ITaskRepository } from "../../repository/task-repository";
import { GetTasksDTO } from "./get-tasks-dto";

export class GetTasksUseCase {
  constructor(private readonly repository: ITaskRepository) {}

  async execute(dto: GetTasksDTO): Promise<TaskResponse[]> {
    const tasks = await this.repository.findAllUserCanSee(dto.userId);

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    }));
  }
}
