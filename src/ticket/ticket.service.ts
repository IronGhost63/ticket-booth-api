import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { User } from "src/user/user.entity";
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    private userService: UserService,
    private concertService: ConcertService,
  ) {}

  async createTicket(ticket: CreateTicketDto) {
    const user = await this.userService.getUserById( ticket.userId );
    const concert = await this.concertService.getConcertById( ticket.concertId );

    if ( !user ) {
      throw new BadRequestException('Invalid user');
    }

    if ( !concert ) {
      throw new BadRequestException('Invalid concert');
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

  async getUserTickets() {

  }

  async getConcertTickets() {

  }

  async getTicketById(id: number) {
    return await this.ticketRepository.findBy({id});
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
