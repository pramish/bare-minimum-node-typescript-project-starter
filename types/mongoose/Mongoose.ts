import type { Types } from "mongoose";
import { Schema } from "mongoose";

export interface IMongoose {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
