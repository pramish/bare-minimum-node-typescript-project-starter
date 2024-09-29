import { Router } from "express";

import { UserRouter } from "./user/User.Router";

export const expressRouter = Router();

// user route
expressRouter.use("/users", UserRouter);
