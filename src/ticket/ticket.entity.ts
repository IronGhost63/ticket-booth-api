import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertId: number;

  @Column()
  userId: number;

  @Column()
  seatNumber: string;

  @Column({ default: 'active' })
  status: string;
}
