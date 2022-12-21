import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { LogoutUseCase } from "./logout-use-case";

export class LogoutController extends BaseController {
  private useCase: LogoutUseCase;

  constructor(useCase: LogoutUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    const { id: userId } = this.req.user;

    try {
      logger.info("LogoutController", { userId });

      await this.useCase.execute({ userId });

      return this.ok();
    } catch (error) {
      return this.fail(error, "LogoutController");
    }
  }
}
