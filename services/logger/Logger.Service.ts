import winston from "winston";
import { ConfigService } from "../config/Config.Service";

class LoggerService {
  private createTransport() {
    const transports: Array<winston.transports.ConsoleTransportInstance> =
      new Array<winston.transports.ConsoleTransportInstance>();

    if (ConfigService.ENVIRONMENT !== "development") {
      transports.push(new winston.transports.Console());
    } else {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
          ),
        }),
      );
    }
    return transports;
  }

  private createTimeStamp() {
    return winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    });
  }

  private createLogger() {
    return winston.createLogger({
      level: ConfigService.LOG_LEVEL,
      levels: winston.config.npm.levels,

      format: winston.format.combine(
        this.createTimeStamp(),

        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: this.createTransport(),
    });
  }

  info(message: string): void {
    this.createLogger().info(message);
  }

  error(message: string): void {
    this.createLogger().error(message);
  }

  debug(message: string): void {
    this.createLogger().debug(message);
  }
}

export const logger = new LoggerService();
