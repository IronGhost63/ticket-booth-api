import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  totalSeats: number;

  @Column({nullable: true})
  coverImage: string;
}
