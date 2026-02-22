import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  id: number;
  status: string;
}

export class UpdateTicketCriteriaDto {
  id: number;
  userId: number;
}

export class UpdateTicketStatusDto {
  status: string;
}
