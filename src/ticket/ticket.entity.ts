import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TicketStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
  USED = "used",
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertId: number;

  @Column()
  userId: number;

  @Column()
  seatNumber: number;

  @Column({default: 'active'})
  status: string;
}
