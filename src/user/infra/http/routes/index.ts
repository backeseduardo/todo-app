import express from "express";
import { middleware } from "../../../../shared/infra";
import { getUsersController } from "../../../use-case/get-users";
import { loginController } from "../../../use-case/login";
import { registerUserController } from "../../../use-case/register-user";

const userRouter = express.Router();

userRouter.post("/register", (req, res) =>
  registerUserController.execute(req, res)
);

userRouter.post("/login", (req, res) => loginController.execute(req, res));

userRouter.get("/", middleware.ensureAuthenticated(), (req, res) =>
  getUsersController.execute(req, res)
);

userRouter.get("/me", middleware.ensureAuthenticated(), (_req, res) => {
  res.send({ message: "ok" });
});

export { userRouter };
