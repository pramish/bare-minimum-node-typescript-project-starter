import { IBaseUser } from "../../types/user/User";

export class ParserService {
  static ParseRawUserData(
    rawData: IBaseUser,
  ): Omit<IBaseUser, "verificationCode" | "passwordHash"> {
    return {
      _id: rawData._id,
      email: rawData.email,
      phoneNumber: rawData.phoneNumber,
      fullName: rawData.fullName,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
    };
  }
}
