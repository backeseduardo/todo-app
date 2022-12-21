import { Repository } from "typeorm";
import { TypeORMDataSource } from "../../shared/infra/database/typeorm/data-source";
import { TaskEntity } from "../../shared/infra/database/typeorm/entity/task";
import { Task } from "../domain/task";
import { ITaskRepository } from "./task-repository";

export class TypeORMTaskRepository implements ITaskRepository {
  private repository: Repository<TaskEntity>;

  constructor() {
    this.repository = TypeORMDataSource.getRepository(TaskEntity);
  }

  async findById(id: string): Promise<Task | undefined> {
    const taskEntity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["createdBy"],
    });

    if (!taskEntity) {
      return undefined;
    }

    return this.fromEntity(taskEntity);
  }

  async findAllUserCanSee(userId: string): Promise<Task[]> {
    const taskEntities = await this.repository
      .createQueryBuilder("task")
      .innerJoinAndSelect("task.createdBy", "createdBy")
      .where("createdBy.id = :userId", { userId })
      .orWhere(":userId = ANY(task.viewers)", { userId })
      .select("task.*")
      .execute();

    return taskEntities;
  }

  async save(task: Task): Promise<Task> {
    const taskEntity = this.toEntity(task);

    const savedTask = await this.repository.save(taskEntity);

    return this.fromEntity(savedTask);
  }

  private fromEntity(taskEntity: TaskEntity): Task {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: taskEntity.status,
      createdBy: taskEntity.createdBy,
      viewers: new Set(taskEntity.viewersArray),
    };
  }

  private toEntity(task: Task): TaskEntity {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdBy: task.createdBy,
      viewersArray: Array.from(task.viewers),
    };
  }
}
