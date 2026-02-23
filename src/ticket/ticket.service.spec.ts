import * as fs from 'node:fs/promises';
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketService } from "./ticket.service";
import { Ticket } from "./ticket.entity";
import { TicketDto } from "./dto/ticket.dto";
import { ConcertService } from "src/concert/concert.service";
import { Concert } from "src/concert/concert.entity";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

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
  })
});
