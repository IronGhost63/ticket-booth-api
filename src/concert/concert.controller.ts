import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService
  ) {}

  @Post()
  createConcert(@Body() concert: CreateConcertDto) {
    console.log(concert);

    return this.concertService.createConcert(concert);
  }

  @Get()
  getAllConcerts() {
    return this.concertService.listConcerts();
  }

  @Get(':id')
  getConcertById(@Param('id') id: string) {
    return this.concertService.getConcertById(+id);
  }

  @Patch(':id')
  updateConcert(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto) {
    return this.concertService.update(+id, updateConcertDto);
  }

  @Delete(':id')
  deleteConcert(@Param('id') id: string) {
    return this.concertService.remove(+id);
  }
}
