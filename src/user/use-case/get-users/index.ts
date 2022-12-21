import { userRepository } from "../../repository";
import { GetUsersUseCase } from "./get-users-use-case";
import { GetUsersController } from "./get-users-controller";

const getUsersUseCase = new GetUsersUseCase(userRepository);

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersController };
