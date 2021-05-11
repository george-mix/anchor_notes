import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Collection from "./CollectionModel";

@Entity("note")
export default class NoteModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column("varchar", { nullable: true })
  text: string;

  @Column()
  collectionId: number;
  @ManyToOne("collection", "notes")
  @JoinColumn({ name: "collectionId" })
  collection: Collection;
}
