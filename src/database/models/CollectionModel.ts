import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import Note from "./NoteModel";

@Entity("collection")
export default class CollectionModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany("note", "collection")
  notes: Note[];
}
