import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { TaskResponse } from "../../domain/task";
import { GetTasksUseCase } from "./get-tasks-use-case";

export class GetTasksController extends BaseController {
  private useCase: GetTasksUseCase;

  constructor(useCase: GetTasksUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      logger.info("GetTasksController");

      const tasks = await this.useCase.execute({
        userId: this.req.user.id,
      });

      return this.ok<TaskResponse[]>(tasks);
    } catch (error) {
      return this.fail(error, "GetTasksController");
    }
  }
}
