import { Connection, Repository } from "typeorm";

interface ICreateNoteData {
  name: string;
  collectionId: number;
}

import NoteModel from "../models/NoteModel";

export default class NotesRepository {
  private ormRepository: Repository<NoteModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(NoteModel);
  }

  public async getAllById(id: number): Promise<NoteModel[]> {
    const notes = await this.ormRepository.find({ collectionId: id });

    return notes;
  }

  public async create({
    name,
    collectionId,
  }: ICreateNoteData): Promise<NoteModel> {
    const note = this.ormRepository.create({
      name,
      collectionId,
    });

    await this.ormRepository.save(note);

    return note;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
