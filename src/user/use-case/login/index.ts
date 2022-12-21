import { userRepository } from "../../repository";
import { LoginController } from "./login-controller";
import { LoginUseCase } from "./login-use-case";
import { authService } from "../../service/auth-service";
import { password } from "../../../shared/util/password";

const loginUseCase = new LoginUseCase(userRepository, password, authService);

const loginController = new LoginController(loginUseCase);

export { loginController };
