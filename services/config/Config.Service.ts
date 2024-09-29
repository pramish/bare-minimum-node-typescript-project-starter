import "dotenv/config";

export class ConfigService {
  static PORT = Number(process.env.PORT);
  static DATABASE_URL = String(process.env.DATABASE_URL);
  static ENVIRONMENT = String(process.env.ENVIRONMENT);

  static PUBLIC_DOMAINS = ["http://localhost:3000"];
  static LOG_LEVEL = "debug";
  static API_VERSION = "/api/v1";
}
