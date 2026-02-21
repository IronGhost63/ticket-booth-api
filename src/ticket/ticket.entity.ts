import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash } from 'crypto';

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

  @Column({unique: true})
  signature: string;

  @BeforeInsert()
  createSignature() {
    const random = this.status === 'active' ? 'active' : Math.random();

    this.signature = hash('sha256', `${this.seatNumber}.${this.concertId}.${random}`);
  }
}
