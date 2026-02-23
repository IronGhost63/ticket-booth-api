import * as fs from 'node:fs/promises';
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";

import { Concert } from './concert.entity';
import { Ticket } from "src/ticket/ticket.entity";

import { ConcertService } from './concert.service';
import { CreateConcertDto, CreateConcertMessageDto } from './dto/create-concert.dto';

describe('Concert Service Unit Spec', () => {
  let moduleRef: TestingModule;
  let concertService: ConcertService;

  const source = 'test/mock.db';
  const destination = 'test/mock-concert.db';

  beforeAll(async () => {
    await fs.copyFile(source, destination);
  });

  afterAll(async () => {
    await fs.unlink(destination)
  });

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './test/mock-concert.db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Concert, Ticket]),
      ],
      providers: [ConcertService],
    }).compile();

    concertService = moduleRef.get<ConcertService>(ConcertService);
  });

  describe('List All Concerts', () => {
    it('Should return array of concerts', async () => {
      const concerts = await concertService.listConcerts();

      expect(concerts.every(concert => concert instanceof Concert)).toBeTruthy();
    })
  });

  describe('Create New Concert', () => {
    it('Should create new concert', async () => {
      const concert = new CreateConcertDto();

      concert.name = 'Thunder Cats';
      concert.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe corrupti quis iusto obcaecati ullam, rerum voluptas vel quam ipsa optio eius. Voluptatibus repellat praesentium quaerat reiciendis deserunt? Est, praesentium maxime!';
      concert.totalSeats = 200;
      concert.date = '2026-04-21';

      expect(await concertService.createConcert(concert)).toBeInstanceOf(CreateConcertMessageDto);
    })
  });

  describe('Get Concert Detail', () => {
    it('Should get concert detail of concertId:12', async () => {
      expect(await concertService.getConcertById(12)).toBeInstanceOf(Concert);
    })
  });

  describe('Delete A Concert', () => {
    it('Should remove concert for concertId:8', async () => {
      await concertService.deleteConcert(8);

      expect(await concertService.getConcertById(8)).toBe(null);
    })
  })
});
