import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from "./ticket/ticket.entity";
import { Concert } from "./concert/concert.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './db/ticket-booth.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Ticket, Concert]),
    AuthModule,
    UserModule,
    ConcertModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
