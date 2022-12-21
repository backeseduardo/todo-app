import { createClient } from "redis";
import { config } from "../../../../config";
import { logger } from "../../../../shared/util/logger";

const redisConnection = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
});

redisConnection
  .on("connect", () => {
    logger.info("Redis connected");
  })
  .on("error", (error) => {
    logger.error(error);
  });

logger.info("Redis is connecting");
redisConnection.connect();

export { redisConnection };
