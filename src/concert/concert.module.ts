import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { Concert } from './concert.entity';
import { Ticket } from "src/ticket/ticket.entity";
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert, Ticket]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
        }
      })
    }),
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
