import { TaskResponse } from "../../domain/task";
import { ITaskRepository } from "../../repository/task-repository";
import { AddViewerToTaskDTO } from "./add-viewer-to-task-dto";

export class AddViewerToTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(dto: AddViewerToTaskDTO): Promise<TaskResponse> {
    const { taskId, viewerId, userId } = dto;

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("task not found");
    }

    if (task.createdBy.id !== userId) {
      throw new Error("cannot add viewer to this task");
    }

    task.viewers.add(viewerId);

    await this.taskRepository.save(task);

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    };
  }
}
