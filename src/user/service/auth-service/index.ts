import { uuid } from "../../../shared/util/uuid";
import { RedisAuthService } from "./redis/redis-auth-service";
import { redisConnection } from "./redis/redis-connection";
import { IAuthService } from "./auth-service";

//@ts-ignore
const authService = new RedisAuthService(redisConnection, uuid);

export { authService, IAuthService };
