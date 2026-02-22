import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket/ticket.entity";
import { Concert } from "./concert/concert.entity";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getStat() {
    const concerts = await this.concertRepository.find();
    const tickets = await this.ticketRepository.find();

    const totalSeats = concerts.reduce((count, item) => count + item.totalSeats, 0);
    const reservedTickets = (tickets.filter( item => item.status === 'active' )).length;
    const cancelledTickets = (tickets.filter( item => item.status === 'cancelled' ).length);

    return {
      totalSeats, reservedTickets, cancelledTickets
    }
  }
}
