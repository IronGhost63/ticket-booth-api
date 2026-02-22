import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Concert } from './concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { validate } from "class-validator";

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

  async createConcert(payload: CreateConcertDto) {
    try {
      const concert = new CreateConcertDto();

      concert.name = payload.name;
      concert.description = payload.description;
      concert.totalSeats = payload.totalSeats;
      concert.date = payload.date;
      concert.coverImage = payload.coverImage;

      const validateErrors = await validate(concert);

      if ( validateErrors.length > 0 ) {
        this.logger.error('Invalid payload');
        this.logger.error(validateErrors);

        throw new BadRequestException( 'Invalid payload' );
      }

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
    try {
      const deleted = await this.concertRepository.delete({id});

      if ( deleted.affected === 0 ) {
        throw new BadRequestException('Requested concert not exists');
      }

      return {message: 'Concert has been deleted'};
    } catch( error ) {
      this.logger.error(`Unable to delete concert: ${error.message}`);

      throw new BadRequestException('Unable to delete a concert');
    }
  }
}
