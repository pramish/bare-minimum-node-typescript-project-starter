import { Request, Response } from "express";
import { IResponse } from "../../types/Response";
import { IBaseUser } from "../../types/user/User";
import { userService } from "../../services/user/User.Service";
import { UtilitiesService } from "../../services/utilities/Utilities.Service";

export async function GetUserByIdController(
  request: Request<{ userId: string }, {}, {}, {}>,
  response: Response,
): Promise<
  Response<IResponse<Omit<IBaseUser, "verificationCode" | "passwordHash">>>
> {
  try {
    const userResult = await userService.getIfUserExistsWithUserId(
      UtilitiesService.transformToMongooseId(request.params.userId),
    );

    return response.status(userResult.statusCode).json({
      code: userResult.code,
      statusCode: userResult.statusCode,
      message: userResult.message,
      data: userResult.data,
    });
  } catch (error: any) {
    return response.status(500).json({
      code: "error",
      statusCode: "500",
      message: error.message ?? "Internal server error",
    });
  }
}
