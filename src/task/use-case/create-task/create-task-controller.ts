import { z } from "zod";
import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { TaskResponse } from "../../domain/task";
import { CreateTaskUseCase } from "./create-task-use-case";

const CreateTaskDTOSchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string().uuid(),
});

export class CreateTaskController extends BaseController {
  private useCase: CreateTaskUseCase;

  constructor(useCase: CreateTaskUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      const dto = CreateTaskDTOSchema.parse({
        title: this.req.body.title,
        description: this.req.body.description,
        userId: this.req.user.id,
      });

      logger.info("CreateTaskController", { dto });

      const task = await this.useCase.execute(dto);

      return this.ok<TaskResponse>(task);
    } catch (error) {
      return this.fail(error, "CreateTaskController");
    }
  }
}
