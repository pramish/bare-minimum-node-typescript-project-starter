import { IUser } from "./User";
import { IResponse } from "../Response";

export interface IGetUserByIdControllerResponse extends IResponse<IUser> {
  users: Array<IUser>;
}
