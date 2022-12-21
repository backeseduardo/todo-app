import { z } from "zod";
import { BaseController } from "../../../shared/util/base-controller";
import { logger } from "../../../shared/util/logger";
import { LoginResponse } from "./login-dto";
import { LoginUseCase } from "./login-use-case";

const LoginDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    try {
      const dto = LoginDTOSchema.parse(this.req.body);

      logger.info("LoginController", { dto });

      const response = await this.useCase.execute(dto);

      return this.ok<LoginResponse>(response);
    } catch (error) {
      return this.fail(error, "LoginController");
    }
  }
}
