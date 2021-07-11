import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("collection")
export default class CollectionModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;
}
