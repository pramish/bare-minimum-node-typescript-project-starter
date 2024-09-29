import request from "supertest";
import express from "express";

import { BaseHttpServerService } from "./BaseHttpServer.Service";
import { ConfigService } from "../config/Config.Service";
import { mongoDBService } from "../database/Mongoose.Service";
import { logger } from "../logger/Logger.Service";
import { UtilitiesService } from "../utilities/Utilities.Service";

export class HttpServerService extends BaseHttpServerService {
  constructor() {
    super(express(), ConfigService.PORT, ConfigService.PUBLIC_DOMAINS);
  }

  async init(): Promise<void> {
    if (!UtilitiesService.isEnvironmentVariablesSet()) {
      logger.error("Environment variables are not initialised.");
      return;
    }

    const databaseInitResult = await mongoDBService.initialiseDatabase();

    if (!databaseInitResult.isConnected) {
      logger.error("Could not connect to database.");
      return;
    }

    await this.start();
  }

  getLocalApp() {
    return request(this.getApp());
  }
}
