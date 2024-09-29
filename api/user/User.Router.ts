import { Router } from "express";

import { middleware } from "../../services/middleware/Middleware.Service";

import { GetUserByIdController } from "./GetUserById.Controller";

export const UserRouter = Router();

// Get user by id
UserRouter.get(
  "/:userId",
  middleware.validateGetUserById(),
  middleware.logRequestDetails,
  GetUserByIdController,
);

// Method not allowed
UserRouter.use(middleware.methodNotAllowed);
