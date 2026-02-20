import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { TicketDto } from "./dto/ticket.dto";
import { Concert } from "src/concert/concert.entity";
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ConcertService } from "src/concert/concert.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private userService: UserService,
    private concertService: ConcertService,
  ) {}

  async createTicket(ticket: CreateTicketDto) {
    const user = await this.userService.getUserById( ticket.userId );
    const concert = await this.concertService.getConcertById( ticket.concertId );
    const existingTicket = await this.ticketRepository.findOneBy( { concertId: ticket.concertId, seatNumber: ticket.seatNumber, status: 'active'} );

    if ( existingTicket ) {
      throw new BadRequestException('Ticket for selected seat is already sold');
    }

    if ( !user ) {
      throw new BadRequestException('Invalid user');
    }

    if ( !concert ) {
      throw new BadRequestException('Invalid concert');
    }

    if ( ticket.seatNumber > concert.total_seats) {
      throw new BadRequestException('Invalid seat number');
    }

    try {
      const insertTicket = new Ticket();

      insertTicket.concertId = ticket.concertId;
      insertTicket.userId = ticket.userId;
      insertTicket.seatNumber = ticket.seatNumber;

      await this.ticketRepository.save(insertTicket);

      return insertTicket;
    } catch( error ) {
      this.logger.error(`Unable to create concert ticket: ${error.message}`);

      throw new BadRequestException('Unable to create concert ticket');
    }
  }

  async getUserTickets(userId: number) {
    const results = await this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoinAndSelect(Concert, 'concert', 'ticket.concertId = concert.id')
      .where("ticket.userId = :id", { id: userId })
      .getRawMany();

    const tickets = results.map( data => {
      const ticket = new TicketDto();

      ticket.id = data.ticket_id;
      ticket.concert = data.concert_name;
      ticket.concertId = data.concert_id;
      ticket.userId = data.ticket_userId;
      ticket.seatNumber = data.ticket_seatNumber;
      ticket.date = data.concert_date;

      return ticket;
    });

    return tickets;
  }

  async getConcertTickets(concertId: number) {
    return await this.ticketRepository.findBy({concertId, status: 'active'});
  }

  async getSeatAvailability(concertId: number) {
    const concert = await this.concertService.getConcertById(concertId);

    if ( !concert ) {
      throw new BadRequestException('Invalid concert id');
    }

    const reservedSeats = await this.ticketRepository.findBy({concertId, status: 'active'});
    const totalSeats = [...Array(concert.total_seats).keys()].map( i => {
      const seat = i + 1;
      const soldTicket = reservedSeats.find( ticket => ticket.seatNumber === seat );

      return {
        seat: seat,
        status: soldTicket ? 'sold' : 'available',
      };
    });

    return totalSeats;
  }

  async getTicketById(id: number) {
    return await this.ticketRepository.findOneBy({id});
  }

  async getUserTicket(id: number, userId: number) {
    console.log({id, userId});

    return await this.ticketRepository.findOneBy({id, userId})
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
