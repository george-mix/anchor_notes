import { Connection, Repository } from "typeorm";

interface ICreateNoteData {
  id?: number;
  name: string;
  text?: string | null;
  collectionId: number;
}

interface IUpdateNoteData {
  id: number;
  name?: string;
  text?: string;
}

import NoteModel from "../models/NoteModel";

export default class NotesRepository {
  private ormRepository: Repository<NoteModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(NoteModel);
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

  public async getAllById(id: number): Promise<NoteModel[]> {
    const notes = await this.ormRepository.find({ collectionId: id });

    return notes;
  }

  public async getOne(id: number): Promise<NoteModel | undefined> {
    const note = await this.ormRepository.findOne(id);

    return note;
  }

  public async update({
    id,
    name,
    text,
  }: IUpdateNoteData): Promise<NoteModel | undefined> {
    await this.ormRepository.update(id, { name, text });
    const note = this.ormRepository.findOne(id);

    return note;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
