import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { UserResponse } from "../../domain/user";
import { GetUsersUseCase } from "./get-users-use-case";

export class GetUsersController extends BaseController {
  private useCase: GetUsersUseCase;

  constructor(useCase: GetUsersUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      logger.info("GetUsersController");

      const users = await this.useCase.execute();

      return this.ok<UserResponse[]>(users);
    } catch (error) {
      return this.fail(error, "GetUsersController");
    }
  }
}
