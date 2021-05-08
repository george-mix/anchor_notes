import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notes")
export default class NoteModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  text: string;
}
