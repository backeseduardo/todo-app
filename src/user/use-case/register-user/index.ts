import { userRepository } from "../../repository";
import { RegisterUserController } from "./register-user-controller";
import { RegisterUserUseCase } from "./register-user-use-case";
import { uuid } from "../../../shared/util/uuid";
import { password } from "../../../shared/util/password";

const registerUserService = new RegisterUserUseCase(
  userRepository,
  uuid,
  password
);

const registerUserController = new RegisterUserController(registerUserService);

export { registerUserController };
