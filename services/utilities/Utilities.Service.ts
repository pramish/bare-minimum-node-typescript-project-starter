import { isValidObjectId, Types } from "mongoose";

export class UtilitiesService {
  private static REQUIRED_ENVIRONMENT_VARIABLES() {
    return ["PORT", "DATABASE_URL", "ENVIRONMENT"]; // TODO: Add more if you have
  }

  static isEnvironmentVariablesSet() {
    return this.REQUIRED_ENVIRONMENT_VARIABLES().every((envVar) => {
      return process.env[envVar];
    });
  }

  static isIdMongooseId(id: string) {
    return isValidObjectId(id);
  }

  static transformToMongooseId(id: string) {
    return new Types.ObjectId(id);
  }
}
