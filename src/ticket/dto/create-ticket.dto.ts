import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateTicketDto {
  id: number;

  @IsNumber()
  @IsNotEmpty()
  concertId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  seatNumber: number;
}
