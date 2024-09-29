import { Types } from "mongoose";
import { Repository } from "../../repository/Repository";

import { UserModel } from "./User.Model";
import { ParserService } from "../parser/Parser.Service";

import { IUser, IBaseUser } from "../../types/user/User";
import { IResponse } from "../../types/Response";

interface IUserService {
  getIfUserExistsWithUserId(
    _id: Types.ObjectId,
  ): Promise<IResponse<Omit<IBaseUser, "verificationCode" | "passwordHash">>>;
}

class UserService implements IUserService {
  private readonly userRepository: Repository<IUser, IBaseUser>;

  constructor(userRepository: Repository<IUser, IBaseUser>) {
    this.userRepository = userRepository;
  }

  async getIfUserExistsWithUserId(
    _id: Types.ObjectId,
  ): Promise<IResponse<Omit<IBaseUser, "verificationCode" | "passwordHash">>> {
    const userResponse = await this.userRepository.getOneByField({ _id });

    if (!userResponse) {
      return {
        statusCode: 404,
        code: "error",
        message: "User not found",
      };
    }

    return {
      statusCode: 200,
      code: "success",
      message: "User found",
      data: ParserService.ParseRawUserData(userResponse),
    };
  }
}

export const userService = new UserService(new Repository(UserModel));
