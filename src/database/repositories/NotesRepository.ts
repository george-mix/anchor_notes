import { Connection, Repository } from "typeorm";

import NoteModel from "../models/NoteModel";

export default class NotesRepository {
  private ormRepository: Repository<NoteModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(NoteModel);
  }

  public async getAll(): Promise<NoteModel[]> {
    const notes = await this.ormRepository.find();

    return notes;
  }
}
