import { Connection, Repository } from "typeorm";

import { ICollectionItem } from "../../utils/types/interfaces";
import Collection from "../models/Collection";

interface ICreateCollectionData {
  name: string;
}

export default class CollectionsRepository {
  private ormRepository: Repository<Collection>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(Collection);
  }

  public async create({ name }: ICreateCollectionData): Promise<Collection> {
    const collection = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(collection);

    return collection;
  }

  public async getAll(): Promise<ICollectionItem[]> {
    const collections = await this.ormRepository.find();

    return collections;
  }
}
