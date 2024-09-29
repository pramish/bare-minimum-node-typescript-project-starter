import express from "express";
import type { Application } from "express";
import { createServer } from "http";
import type { Server } from "http";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import { ConfigService } from "../config/Config.Service";
import { expressRouter } from "../../api/Api";

export class BaseHttpServerService {
  private readonly port: number;
  private readonly app: Application;
  private readonly publicDomains: Array<string>;
  private server: Server | undefined;

  constructor(app: Application, port: number, publicDomains: Array<string>) {
    this.port = port;
    this.app = app;
    this.publicDomains = publicDomains;
  }

  getApp(): express.Application {
    return this.app;
  }

  async start(): Promise<void> {
    this.getApp().use(helmet());

    this.getApp().use(
      cors({
        origin: this.publicDomains,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }),
    );

    this.getApp().use(express.json());

    this.getApp().use(
      rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        limit: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: "draft-7",
        legacyHeaders: false,
        message: "Please slow down!",
      }),
    );

    this.app.use(ConfigService.API_VERSION, expressRouter);

    this.server = createServer(this.getApp());

    this.server.listen(this.port, () => {
      console.log("Server started on port: ", this.port);
    });
  }
}
