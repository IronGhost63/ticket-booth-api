import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/roles.enum";

@Controller('ticket')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  getCurrentUserTickets(@Request() req ) {
    return this.ticketService.getUserTickets( req.user.id );
  }

  @Get('/user/:userId')
  @Roles(Role.ADMIN)
  getUserTickets(@Param() userId: number) {
    return this.ticketService.getUserTickets( userId );
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  getTicketById(@Param('id') id: number, @Request() req) {
    return this.ticketService.getUserTicket(id, req.user.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.ticketService.remove(id);
  }

  @Get('/concert/:concertId')
  @Roles(Role.ADMIN, Role.USER)
  getConcertTickets(@Param('concertId') concertId: number) {
    return this.ticketService.getConcertTickets( concertId );
  }

  @Get('/concert/:concertId/availability')
  @Roles(Role.ADMIN, Role.USER)
  getSeatAvailability(@Param('concertId') concertId: number) {
    return this.ticketService.getSeatAvailability( concertId );
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  reserveTicket(@Body() payload: CreateTicketDto, @Request() req) {
    if ( req.user.roles === Role.USER && payload.userId !== req.user.id ) {
      throw new BadRequestException('Invalid user id');
    }

    return this.ticketService.createTicket(payload);
  }
}
