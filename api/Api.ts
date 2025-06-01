import express, { Response, Router, Request } from "express";

import { UserRouter } from "./user/User.Router";

export const expressRouter = Router();

// user route
// expressRouter.use("/", UserRouter);

expressRouter.get("/", express.json(), (request: Request, response: Response) => {
    return response.json({
        message: "This is working. Yaaaaay"
    })
} );
