import * as fs from 'node:fs/promises';
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Concert } from "src/concert/concert.entity";
import { Ticket } from "./ticket.entity";
import { User } from "src/user/user.entity";

import { TicketDto, SoldTiccketDto } from "./dto/ticket.dto";
import { CreateTicketDto } from "./dto/create-ticket.dto";

import { ConcertService } from "src/concert/concert.service";
import { TicketService } from "./ticket.service";
import { UserService } from "src/user/user.service";


describe('Ticket Service Unit Spec', () => {
  let ticketService: TicketService;
  let concertService: ConcertService;
  let userService: UserService;
  let moduleRef: TestingModule;

  const source = 'test/mock.db';
  const destination = 'test/mock-ticket.db';

  beforeAll(async () => {
    await fs.copyFile(source, destination);
  });

  afterAll(async () => {
    await fs.unlink(destination);
  });

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './test/mock-ticket.db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Ticket, Concert, User]),
      ],
      providers: [TicketService, ConcertService, UserService],
    }).compile();

    ticketService = moduleRef.get<TicketService>(TicketService);
    concertService = moduleRef.get<ConcertService>(ConcertService);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('List User\'s Tickets', () => {
    it('Should return array of tickets of userId:1', async () => {
      const tickets = await ticketService.getUserTickets(1);

      expect( tickets.every( ticket => ticket instanceof TicketDto )).toBeTruthy();
    })
  });

  describe('Reserving Seat', () => {
    it('Should create new ticket for ConcertId:1 for UserId:1', async () => {
      const newTicket = new CreateTicketDto();

      newTicket.userId = 1;
      newTicket.concertId = 1;

      expect( await ticketService.createTicket(newTicket) ).toBeInstanceOf(Ticket);
    })
  });

  describe('List Reserved Seats', () => {
    it('Should list all reserved ticket for concertId:2', async () => {
      const tickets = await ticketService.getConcertTickets(1);

      expect(tickets.every( ticket => ticket instanceof Ticket )).toBeTruthy();
    });
  });

  describe('List Available Seats', () => {
    it('Should list all available seats for concertId:1', async () => {
      const seats = await ticketService.getSeatAvailability(1);

      expect(seats.every( seat => seat instanceof SoldTiccketDto)).toBeTruthy()
    })
  })
});
