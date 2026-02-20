import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Concert } from './concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertService {
  private readonly logger = new Logger(ConcertService.name);

  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>
  ){}

  async listConcerts() {
    return await this.concertRepository.find();
  }

  async createConcert(createConcertDto: CreateConcertDto) {
    try {
      const concert = new Concert();

      concert.name = createConcertDto.name;
      concert.description = createConcertDto.description;
      concert.total_seats = parseInt(createConcertDto.total_seats);

      await this.concertRepository.save(concert);

      return {
        message: 'Concert created successfully',
        concertId: concert.id,
      }
    } catch ( error ) {
      this.logger.error(`Failed to create concert: ${error.message}`);

      throw new BadRequestException('An unexpected error occurred while creating a concert');
    }
  }

  async getConcertById( concertId: number ) {
    return await this.concertRepository.findOneBy({ id: concertId });
  }

  async updateConcert(id: number, concert: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  async deleteConcert(id: number) {
    return `This action removes a #${id} concert`;
  }
}
