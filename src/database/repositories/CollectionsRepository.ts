import { Connection, Repository } from "typeorm";

interface ICreateCollectionData {
  name: string;
}

import CollectionModel from "../models/CollectionModel";

export default class CollectionsRepository {
  private ormRepository: Repository<CollectionModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(CollectionModel);
  }

  public async getAll(): Promise<CollectionModel[]> {
    const collections = await this.ormRepository.find();

    return collections;
  }

  public async create({
    name,
  }: ICreateCollectionData): Promise<CollectionModel> {
    const collection = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(collection);

    return collection;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
