import express from "express";
import { taskRouter } from "../../../../task/infra/http/routes";
import { userRouter } from "../../../../user/infra/http/routes";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/tasks", taskRouter);

export { v1Router };
