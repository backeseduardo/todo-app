import { z } from "zod";
import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { TaskResponse } from "../../domain/task";
import { AddViewerToTaskUseCase } from "./add-viewer-to-task-use-case";

const AddViewerToTaskDTOSchema = z.object({
  taskId: z.string().uuid(),
  viewerId: z.string().uuid(),
  userId: z.string().uuid(),
});

export class AddViewerToTaskController extends BaseController {
  private useCase: AddViewerToTaskUseCase;

  constructor(useCase: AddViewerToTaskUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      const dto = AddViewerToTaskDTOSchema.parse({
        taskId: this.req.params.taskId,
        viewerId: this.req.params.viewerId,
        userId: this.req.user.id,
      });

      logger.info("AddViewerToTaskController", { dto });

      const task = await this.useCase.execute(dto);

      return this.ok<TaskResponse>(task);
    } catch (error) {
      return this.fail(error, "AddViewerToTaskController");
    }
  }
}
