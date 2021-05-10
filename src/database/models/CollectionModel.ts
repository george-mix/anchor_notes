import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notes")
export default class CollectionModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;
}
