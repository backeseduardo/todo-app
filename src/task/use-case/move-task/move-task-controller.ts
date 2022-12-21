import { z } from "zod";
import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { TaskResponse } from "../../domain/task";
import { MoveTaskUseCase } from "./move-task-use-case";

const MoveTaskDTOSchema = z.object({
  taskId: z.string().uuid(),
  userId: z.string().uuid(),
  newStatus: z.enum(["todo", "in_progress", "done", "archived"]),
});

export class MoveTaskController extends BaseController {
  private useCase: MoveTaskUseCase;

  constructor(useCase: MoveTaskUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      const dto = MoveTaskDTOSchema.parse({
        taskId: this.req.params.taskId,
        newStatus: this.req.params.status,
        userId: this.req.user.id,
      });

      logger.info("MoveTaskController", { dto });

      const task = await this.useCase.execute(dto);

      return this.ok<TaskResponse>(task);
    } catch (error) {
      return this.fail(error, "MoveTaskController");
    }
  }
}
