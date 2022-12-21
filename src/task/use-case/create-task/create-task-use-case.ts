import { IUserRepository } from "../../../user/repository/user-repository";
import { IUUID } from "../../../shared/util/uuid/uuid";
import { TaskResponse } from "../../domain/task";
import { ITaskRepository } from "../../repository/task-repository";
import { CreateTaskDTO } from "./create-task-dto";

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly uuid: IUUID,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: CreateTaskDTO): Promise<TaskResponse> {
    const { title, description, userId } = dto;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const task = await this.taskRepository.save({
      id: this.uuid.generate(),
      title,
      description,
      status: "todo",
      createdBy: user,
      viewers: new Set(),
    });

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    };
  }
}
