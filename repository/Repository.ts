import { Model, UpdateQuery, FilterQuery, Types } from "mongoose";

interface IRepository<T, U> {
  create(userData: T): Promise<U>;

  getAll(): Promise<Array<U>>;

  getAllByField(field: FilterQuery<T>): Promise<Array<U>>;

  getAllPaginated(limit: number, page: number): Promise<Array<U>>;

  getOneById(_id: Types.ObjectId): Promise<U>;

  deleteOneById(_id: Types.ObjectId): Promise<U>;

  updateOneById(_id: Types.ObjectId, dataToUpdate: UpdateQuery<T>): Promise<U>;

  updateOneByField(
    field: FilterQuery<T>,
    dataToUpdate: UpdateQuery<T>,
  ): Promise<U>;

  getOneByField(field: FilterQuery<T>): Promise<U>;

  findOneAndUpsertById(
    _id: Types.ObjectId,
    dataToUpsert: UpdateQuery<T>,
  ): Promise<U>;
}

export class Repository<T, U> implements IRepository<T, U> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(userData: T): Promise<U> {
    return new this.model(userData).save() as unknown as U;
  }

  async getAll(): Promise<Array<U>> {
    return this.model.find() as unknown as Array<U>;
  }

  async getAllByField(field: FilterQuery<T>): Promise<Array<U>> {
    return this.model.find(field) as unknown as Array<U>;
  }

  async getAllByFieldAndPopulate(
    field: FilterQuery<T>,
    fieldToPopulate: keyof T,
    select: string,
  ): Promise<Array<U>> {
    return this.model.find(field).populate({
      path: fieldToPopulate as string,
      select: select,
    }) as unknown as Array<U>;
  }

  async getAllPaginated(limit: number, page: number): Promise<Array<U>> {
    return this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit) as unknown as Array<U>;
  }

  async getOneById(_id: Types.ObjectId): Promise<U> {
    return this.model.findById(_id) as unknown as U;
  }

  async getOneByField(field: FilterQuery<T>): Promise<U> {
    return this.model.findOne(field) as unknown as U;
  }

  async deleteOneById(_id: Types.ObjectId): Promise<U> {
    return this.model.deleteOne(_id) as unknown as U;
  }

  async updateOneById(
    _id: Types.ObjectId,
    dataToUpdate: UpdateQuery<T>,
  ): Promise<U> {
    return this.model.findByIdAndUpdate(_id, dataToUpdate, {
      new: true,
    }) as unknown as U;
  }

  async updateOneByField(
    field: FilterQuery<T>,
    dataToUpdate: UpdateQuery<T>,
  ): Promise<U> {
    return this.model.findOneAndUpdate(field, dataToUpdate, {
      new: true,
    }) as unknown as U;
  }

  async findOneAndUpsertById(
    _id: Types.ObjectId,
    dataToUpsert: UpdateQuery<T>,
  ): Promise<U> {
    return this.model.findOneAndUpdate(_id, dataToUpsert, {
      new: true,
      upsert: true,
    }) as unknown as U;
  }
}
