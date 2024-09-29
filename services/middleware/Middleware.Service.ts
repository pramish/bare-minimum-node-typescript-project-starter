import { NextFunction, Request, Response } from "express";
import { validationResult, param } from "express-validator";

import { logger } from "../logger/Logger.Service";
import { UtilitiesService } from "../utilities/Utilities.Service";

class MiddlewareService {
  constructor() {
    this.logRequestDetails = this.logRequestDetails.bind(this);
  }

  private MASKED_DATA = "********";
  private MASKED_FIELDS = [
    "password",
    "verificationCode",
    "authenticationtoken",
    "token",
  ];

  private HandleValidationResult(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logger.error(`Validation errors: ${JSON.stringify(errors)}`);
      return response.status(400).json({ errors: errors.array() });
    }
    logger.info("Validation passed");
    next(); // Move
  }

  methodNotAllowed(request: Request, response: Response) {
    logger.error(`${request.method} Method not allowed for ${request.baseUrl}`);
    return response.status(405).json({
      status_code: 405,
      message: "Method not allowed",
    });
  }

  logRequestDetails(request: Request, _: Response, next: NextFunction): void {
    if (Object.keys(request.body).length) {
      const requestBodyCopy = { ...request.body };

      this.MASKED_FIELDS.forEach((field) => {
        if (requestBodyCopy[field]) {
          requestBodyCopy[field] = this.MASKED_DATA;
        }
      });

      logger.info(`Request Details - Body: ${JSON.stringify(requestBodyCopy)}`);
    }

    if (Object.keys(request.params).length) {
      logger.info(
        `Request Details - Params: ${JSON.stringify(request.params)}`,
      );
    }

    if (Object.keys(request.query).length) {
      logger.info(`Request Details - Query: ${JSON.stringify(request.query)}`);
    }

    next();
  }

  validateGetUserById() {
    return [
      param("userId")
        .isString()
        .withMessage("UserId is required")
        .custom((value) => {
          return UtilitiesService.isIdMongooseId(value);
        })
        .withMessage("Invalid userId format"),
      // Custom middleware to check for validation errors
      this.HandleValidationResult,
    ];
  }
}

export const middleware = new MiddlewareService();
