import * as dotenv from "dotenv";

dotenv.config();

type EnvType = "production" | "testing" | "development";

type Config = {
  isProduction: boolean;
  env: EnvType;
  serviceName: string;
  http: {
    port: number;
  };
  jwt: {
    key: string;
    expiresIn?: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
  };
};

export const config: Config = {
  isProduction: process.env.NODE_ENV === "production",
  env: (process.env.NODE_ENV || "development") as EnvType,
  serviceName: process.env.SERVICE_NAME ?? "",
  http: {
    port: parseInt(process.env.HTTP_PORT!),
  },
  jwt: {
    key: process.env.TOKEN_KEY!,
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  },
  database: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    name: process.env.DATABASE_NAME!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
  },
};
