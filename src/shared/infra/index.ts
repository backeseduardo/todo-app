import { authService } from "../../user/service/auth-service";
import { Middleware } from "../util/middleware";

const middleware = new Middleware(authService);

export { middleware };
