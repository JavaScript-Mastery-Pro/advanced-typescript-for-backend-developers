import { injectable } from "inversify";
import { Document, Model } from "mongoose";

export interface IGenericService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

@injectable()
export class GenericService<T extends Document> implements IGenericService<T> {
  constructor(private model: Model<T>) {}

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  public async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
