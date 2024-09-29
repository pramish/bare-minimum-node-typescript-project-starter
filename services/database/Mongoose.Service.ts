import { connect } from "mongoose";

import { ConfigService } from "../config/Config.Service";
import { logger } from "../logger/Logger.Service";

interface IInitialiseDatabase {
  message: string;
  isConnected: boolean;
}

class MongoDBService {
  private readonly databaseConnectionURL: string;

  constructor(databaseConnectionURL: string) {
    this.databaseConnectionURL = databaseConnectionURL;
  }

  async initialiseDatabase(): Promise<IInitialiseDatabase> {
    try {
      const mongooseConnection = await connect(this.databaseConnectionURL);

      if (!mongooseConnection.ConnectionStates?.connected) {
        logger.error("Database could not be connected");
        return {
          message: "Database could not be connected",
          isConnected: false,
        };
      }

      logger.info("Successfully connected to the database");
      return {
        message: "Successfully connected to the database",
        isConnected: true,
      };
    } catch (error) {
      logger.error(
        `Internal server error on connecting to Mongoose ${JSON.stringify(error)}`,
      );
      return {
        message: `Internal server error on connecting to Mongoose ${JSON.stringify(error)}`,
        isConnected: false,
      };
    }
  }
}

export const mongoDBService = new MongoDBService(ConfigService.DATABASE_URL);
