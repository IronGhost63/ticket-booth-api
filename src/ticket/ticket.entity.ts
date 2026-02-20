import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Concert } from "src/concert/concert.entity";
import { User } from "src/user/user.entity";

export enum TicketStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
  USED = "used",
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Concert, (concert) => concert.id)
  @Column()
  concertId: number;

  // @ManyToOne(() => User, user => user.id)
  @Column()
  userId: number;

  @Column()
  seatNumber: number;

  @Column({default: 'active'})
  status: string;
}
