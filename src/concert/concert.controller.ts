import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from 'src/auth/roles.decorator';
import { Role } from "src/auth/roles.enum";

@Controller('concert')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  createConcert(@Body() concert: CreateConcertDto) {
    return this.concertService.createConcert(concert);
  }

  @Get()
  getAllConcerts() {
    return this.concertService.listConcerts();
  }

  @Get(':id')
  getConcertById(@Param('id') id: number) {
    return this.concertService.getConcertById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  updateConcert(@Param('id') id: number, @Body() updateConcertDto: UpdateConcertDto) {
    return this.concertService.updateConcert(id, updateConcertDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteConcert(@Param('id') id: number) {
    return this.concertService.deleteConcert(id);
  }
}
