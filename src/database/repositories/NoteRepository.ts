import { Connection, Repository } from "typeorm";

interface ICreateNoteData {
  name: string;
  collectionId: number;
  isRoot?: boolean;
  parentId?: number;
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

  public async createRootNote({
    name,
    collectionId,
  }: ICreateNoteData): Promise<void> {
    const root = await this.ormRepository.create({
      name,
      collectionId,
    });
    await this.ormRepository.save(root);
    await this.ormRepository.update(root.id, {
      isRoot: true,
    });
  }

  public async createChildNote({
    name,
    collectionId,
    parentId,
  }: ICreateNoteData): Promise<void> {
    const child = await this.ormRepository.create({
      name,
      collectionId,
      parentId,
    });
    await this.ormRepository.save(child);
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

  public async deleteOne(id: number): Promise<void> {
    const note = await this.ormRepository.findOne(id);
    const parentId = note?.parentId;
    const isRoot = note?.isRoot;
    if (isRoot) {
      await this.ormRepository.update(
        { parentId: id },
        { isRoot: true, parentId: null }
      );
    }
    if (parentId) {
      await this.ormRepository.update({ parentId: id }, { parentId: parentId });
    }
    await this.ormRepository.delete(id);
  }

  public async deleteAllById(id: number): Promise<void> {
    await this.ormRepository.delete({ collectionId: id });
  }
}
