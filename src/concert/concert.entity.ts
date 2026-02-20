import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true})
  date: string;

  @Column()
  total_seats: number;
}
