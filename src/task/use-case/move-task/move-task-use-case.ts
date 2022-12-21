import { TaskResponse } from "../../domain/task";
import { ITaskRepository } from "../../repository/task-repository";
import { MoveTaskDTO } from "./move-task-dto";

export class MoveTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(dto: MoveTaskDTO): Promise<TaskResponse> {
    const { taskId, newStatus, userId } = dto;

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.createdBy.id !== userId && !task.viewers.has(userId)) {
      throw new Error("User cannot move task");
    }

    const updatedTask = await this.taskRepository.save({
      ...task,
      status: newStatus,
    });

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
    };
  }
}
