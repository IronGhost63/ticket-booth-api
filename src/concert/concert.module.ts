import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { Ticket } from "src/ticket/ticket.entity";
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Ticket])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
