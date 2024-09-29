import { IMongoose } from "../mongoose/Mongoose";

export interface IBaseUser extends IUser, IMongoose {}

export interface IUser {
  email: string;
  fullName: string;
  phoneNumber: string;
  passwordHash: string;
}
