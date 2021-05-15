import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ default: false })
  isRoot: boolean;

  @Column({ nullable: true })
  parentId: number | null;
  @ManyToOne("note", "children")
  @JoinColumn({ name: "parentId" })
  parent: NoteModel;

  @OneToMany("note", "parent")
  children: NoteModel[];
}
