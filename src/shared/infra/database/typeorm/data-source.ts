import { DataSource } from "typeorm";
import { config } from "../../../../config";

export const TypeORMDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: config.isProduction === false,
  logging: false,
  entities: [`${__dirname}/entity/*{.ts,.js}`],
  migrations: [`${__dirname}/migration/*{.ts,.js}`],
});
