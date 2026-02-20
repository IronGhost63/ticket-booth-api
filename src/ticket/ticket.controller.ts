import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketService.remove(id);
  }

  @Get('/concert/:concertId')
  getConcertTickets(@Param('concertId') concertId: number) {
    return `get seat map for concert ${concertId}`;
  }

  @Post('/concert/:concertId')
  reserveTicket(@Param('concertId') concertId: number) {
    return `reserve a ticket for concert ${concertId}`;
  }
}
