import { z } from "zod";
import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { UserResponse } from "../../domain/user";
import { RegisterUserUseCase } from "./register-user-use-case";

const RegisterUserDTOSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export class RegisterUserController extends BaseController {
  private useCase: RegisterUserUseCase;

  constructor(useCase: RegisterUserUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<any> {
    try {
      const dto = RegisterUserDTOSchema.parse(this.req.body);

      logger.info("RegisterUserController", { dto });

      const user = await this.useCase.execute(dto);

      return this.ok<UserResponse>(user);
    } catch (error) {
      return this.fail(error, "RegisterUserController");
    }
  }
}
