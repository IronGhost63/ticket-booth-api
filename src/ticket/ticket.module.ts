import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./ticket.entity";
import { User } from "src/user/user.entity";
import { Concert } from "src/concert/concert.entity";
import { TicketService } from './ticket.service';
import { UserService } from "src/user/user.service";
import { ConcertService } from "src/concert/concert.service";
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Concert]),
  ],
  controllers: [TicketController],
  providers: [TicketService, UserService, ConcertService],
})
export class TicketModule {}
