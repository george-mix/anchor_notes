import { Connection, Repository } from "typeorm";

import Collection from "../models/Collection";

export default class CollectionsRepository {
  private ormRepository: Repository<Collection>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(Collection);
  }
}
