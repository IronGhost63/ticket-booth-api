import { IsNumber, IsNotEmpty } from "class-validator";

export class TicketDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  concert: string;

  @IsNotEmpty()
  concertId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  seatNumber: number;

  date: string;
  status: string;
}
